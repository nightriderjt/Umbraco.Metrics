import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { PerformanceMetrics } from "../../types/performance-metrics.js";
import type { StatRow } from "../../components/stat-card.element.js";
import { formatNumber } from "../../utils/format-utils.js";
import "../../components/metric-card.element.js";
import "../../components/metrics-grid.element.js";
import "../../components/stat-card.element.js";
import stylesString from '../../css/dashboard.element.css?inline';

@customElement("umbmetrics-heap-tab")
export class UmbMetricsHeapTabElement extends UmbElementMixin(LitElement) {
  @property({ type: Object, attribute: false })
  performanceMetrics?: PerformanceMetrics;

  render() {
    if (!this.performanceMetrics) {
      return html`<p>${this.localize?.term('dashboard_clickToLoadHeap') || 'Click "Refresh Metrics" to load heap information'}</p>`;
    }

    const m = this.performanceMetrics;

    const heapStats: StatRow[] = [
      { label: 'Gen 0', value: `${m.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_gc_gen0_heap') || 'Generation 0 heap contains short-lived objects' },
      { label: 'Gen 1', value: `${m.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_gc_gen1_heap') || 'Generation 1 heap contains objects that survived Gen 0 collection' },
      { label: 'Gen 2', value: `${m.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_gc_gen2_heap') || 'Generation 2 heap contains long-lived objects' },
    ];

    const collectionStats: StatRow[] = [
      { label: 'Gen 0', value: formatNumber(m.garbageCollectionStats.gen0Collections), info: this.localize?.term('stat_info_gc_gen0_collections') || 'Number of Generation 0 garbage collections' },
      { label: 'Gen 1', value: formatNumber(m.garbageCollectionStats.gen1Collections), info: this.localize?.term('stat_info_gc_gen1_collections') || 'Number of Generation 1 garbage collections' },
      { label: 'Gen 2', value: formatNumber(m.garbageCollectionStats.gen2Collections), info: this.localize?.term('stat_info_gc_gen2_collections') || 'Number of Generation 2 garbage collections (full GC)' },
    ];

    const gcDetails: StatRow[] = [
      { label: 'GC Mode', value: m.garbageCollectionStats.isServerGC ? "Server" : "Workstation", info: this.localize?.term('stat_info_gc_mode') || 'Server GC is optimized for multi-core servers, Workstation GC for client apps' },
      { label: 'Total Heap Size', value: `${m.memoryUsage.totalHeapSizeMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_total_heap_size') || 'Total memory allocated for managed objects across all generations' },
      { label: 'Fragmented Memory', value: `${m.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_fragmented_memory') || 'Memory that is allocated but cannot be used due to fragmentation' },
      { label: 'Memory Load', value: `${m.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_memory_load') || 'Current memory load on the system' },
      { label: 'High Memory Threshold', value: `${m.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB`, info: this.localize?.term('stat_info_high_memory_threshold') || 'Memory threshold that triggers aggressive garbage collection' },
      { label: 'Latency Mode', value: m.garbageCollectionStats.gcLatencyMode, info: this.localize?.term('stat_info_latency_mode') || 'GC latency mode affects how aggressively garbage collection runs' },
      { label: 'Total Pause Time', value: `${m.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms`, info: this.localize?.term('stat_info_total_pause_time') || 'Total time the application was paused for garbage collection' },
    ];

    return html`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-box"
          title="GC Heap Sizes"
          .stats=${heapStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-trash"
          title="GC Collections"
          .stats=${collectionStats}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="4"
          icon="icon-chart"
          title="Garbage Collector Details"
          .stats=${gcDetails}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
  }

  static styles = css`${unsafeCSS(stylesString)}`;
}

export default UmbMetricsHeapTabElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-heap-tab": UmbMetricsHeapTabElement;
  }
}
