import type { PerformanceMetrics } from '../types/performance-metrics.js';
import * as signalR from '@microsoft/signalr';

export class MetricsPerformanceService {
  #connection?: signalR.HubConnection;
  #listeners: Set<(metrics: PerformanceMetrics) => void> = new Set();
  #isConnecting: boolean = false;
  #tokenProvider: () => Promise<string>;
  
  private readonly API_BASE_URL = '/umbraco/management/api/v1/metrics';
  private readonly HUB_URL = '/umbraco/metrics-hub';

  constructor(tokenProvider: () => Promise<string>) {
    this.#tokenProvider = tokenProvider;
  }

  /**
   * Fetches current performance metrics from the server (one-time request)
   */
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const token = await this.#tokenProvider();
    
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${this.API_BASE_URL}/performance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please ensure you are logged into the Umbraco backoffice');
      }
      
      throw new Error(
        `Failed to fetch performance metrics: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data as PerformanceMetrics;
  }

  /**
   * Connect to SignalR hub for real-time metrics updates
   */
  async connectToHub(): Promise<void> {
    // Prevent multiple connection attempts
    if (this.#isConnecting) {
      console.log('Connection already in progress, waiting...');
      await this.#waitForConnection();
      return;
    }

    if (this.#connection?.state === signalR.HubConnectionState.Connected) {
      console.log('Already connected to hub');
      return;
    }

    // Cleanup any existing connection
    if (this.#connection) {
      await this.disconnectFromHub();
    }

    this.#isConnecting = true;

    try {
      console.log('Building SignalR connection...');

      this.#connection = new signalR.HubConnectionBuilder()
        .withUrl(this.HUB_URL, {
          accessTokenFactory: async () => {
            return await this.#tokenProvider();
          }
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Custom retry delays: 0s, 2s, 5s, 10s, then 30s
            if (retryContext.previousRetryCount === 0) return 0;
            if (retryContext.previousRetryCount === 1) return 2000;
            if (retryContext.previousRetryCount === 2) return 5000;
            if (retryContext.previousRetryCount === 3) return 10000;
            return 30000;
          }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Set up event handlers BEFORE starting connection
      this.#connection.on('ReceiveMetrics', (metrics: PerformanceMetrics) => {
        console.log('Received metrics from SignalR');
        this.#notifyListeners(metrics);
      });

      this.#connection.onreconnected(async (connectionId) => {
        console.log('SignalR reconnected:', connectionId);
        // Request fresh metrics after reconnection
        try {
          await this.#connection?.invoke('RequestMetrics');
        } catch (error) {
          console.error('Error requesting metrics after reconnect:', error);
        }
      });

      this.#connection.onreconnecting((error) => {
        console.log('SignalR reconnecting...', error);
      });

      this.#connection.onclose((error) => {
        console.log('SignalR connection closed', error);
        this.#isConnecting = false;
      });

      // Start connection with timeout
      console.log('Starting SignalR connection...');
      const connectionTimeout = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 15 seconds')), 15000)
      );

      await Promise.race([
        this.#connection.start(),
        connectionTimeout
      ]);

      console.log('SignalR connected successfully');

      // Wait a moment for connection to stabilize
      await new Promise(resolve => setTimeout(resolve, 500));

      // Request initial metrics
      console.log('Requesting initial metrics...');
      await this.#connection.invoke('RequestMetrics');

      this.#isConnecting = false;

    } catch (error) {
      this.#isConnecting = false;
      console.error('Error connecting to SignalR hub:', error);
      
      // Cleanup failed connection
      if (this.#connection) {
        try {
          await this.#connection.stop();
        } catch (stopError) {
          console.error('Error stopping failed connection:', stopError);
        }
        this.#connection = undefined;
      }
      
      throw error;
    }
  }

  /**
   * Wait for ongoing connection attempt to complete
   */
  async #waitForConnection(maxWait: number = 20000): Promise<void> {
    const startTime = Date.now();
    
    while (this.#isConnecting && (Date.now() - startTime) < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (this.#isConnecting) {
      throw new Error('Connection timeout - another connection attempt is taking too long');
    }
  }

  /**
   * Disconnect from SignalR hub
   */
  async disconnectFromHub(): Promise<void> {
    if (this.#connection) {
      try {
        // Remove all event handlers
        this.#connection.off('ReceiveMetrics');
        
        await this.#connection.stop();
        console.log('SignalR disconnected from metrics hub');
      } catch (error) {
        console.error('Error during disconnect:', error);
      } finally {
        this.#connection = undefined;
        this.#isConnecting = false;
      }
    }
  }

  /**
   * Subscribe to real-time metrics updates
   */
  onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.#listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.#listeners.delete(callback);
    };
  }

  /**
   * Manually request metrics update from the hub
   */
  async requestMetrics(): Promise<void> {
    if (!this.#connection || this.#connection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('Not connected to metrics hub');
    }

    try {
      await this.#connection.invoke('RequestMetrics');
    } catch (error) {
      console.error('Error requesting metrics:', error);
      throw new Error('Failed to request metrics from hub');
    }
  }

  /**
   * Check if connected to hub
   */
  get isConnected(): boolean {
    return this.#connection?.state === signalR.HubConnectionState.Connected;
  }

  /**
   * Get current connection state
   */
  get connectionState(): string {
    return this.#connection?.state?.toString() || 'Disconnected';
  }

   #notifyListeners(metrics: PerformanceMetrics): void {
    this.#listeners.forEach(listener => {
      try {
        listener(metrics);
      } catch (error) {
        console.error('Error in metrics listener:', error);
      }
    });
  }
}

