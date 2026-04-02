import aiohttp
import asyncio
import time
from datetime import datetime
import statistics
from collections import defaultdict
import signal
import sys

class LoadTester:
    def __init__(self, url, num_users=50, duration_seconds=180):
        self.url = url
        self.num_users = num_users
        self.duration_seconds = duration_seconds
        self.results = defaultdict(list)
        self.running = True
        self.request_count = 0
        self.error_count = 0
        
    def signal_handler(self, signum, frame):
        """Handle Ctrl+C gracefully"""
        print("\n\n⚠️  Interrupted by user. Generating partial report...")
        self.running = False
        
    async def make_request(self, session, user_id, request_id):
        """Make a single HTTP request and record timing"""
        start_time = time.time()
        try:
            async with session.get(self.url, timeout=aiohttp.ClientTimeout(total=10)) as response:
                end_time = time.time()
                response_time = (end_time - start_time) * 1000  # Convert to milliseconds
                
                self.results[user_id].append({
                    'status': response.status,
                    'response_time': response_time,
                    'timestamp': end_time
                })
                
                if response.status == 200:
                    self.request_count += 1
                else:
                    self.error_count += 1
                    
                return response_time, response.status
                
        except Exception as e:
            end_time = time.time()
            response_time = (end_time - start_time) * 1000
            self.results[user_id].append({
                'status': 'error',
                'response_time': response_time,
                'timestamp': end_time,
                'error': str(e)
            })
            self.error_count += 1
            return response_time, None
            
    async def user_behavior(self, user_id, session):
        """Simulate a single user making requests continuously"""
        request_id = 0
        start_time = time.time()
        
        while self.running and (time.time() - start_time) < self.duration_seconds:
            request_id += 1
            response_time, status = await self.make_request(session, user_id, request_id)
            
            # Small random delay between requests to simulate realistic user behavior
            await asyncio.sleep(0.1)  # 100ms delay between requests
            
    async def run_test(self):
        """Run the load test with multiple concurrent users"""
        print(f"🚀 Starting load test...")
        print(f"📍 URL: {self.url}")
        print(f"👥 Users: {self.num_users}")
        print(f"⏱️  Duration: {self.duration_seconds} seconds")
        print(f"{'='*60}\n")
        
        start_time = time.time()
        
        # Create a connector with connection limits
        connector = aiohttp.TCPConnector(limit=self.num_users * 2, limit_per_host=self.num_users)
        
        async with aiohttp.ClientSession(connector=connector) as session:
            # Create tasks for each user
            tasks = []
            for user_id in range(self.num_users):
                task = asyncio.create_task(self.user_behavior(user_id, session))
                tasks.append(task)
            
            # Display progress
            while self.running and (time.time() - start_time) < self.duration_seconds:
                elapsed = int(time.time() - start_time)
                remaining = self.duration_seconds - elapsed
                print(f"\r⏳ Progress: {elapsed}/{self.duration_seconds} seconds | "
                      f"Requests: {self.request_count} | Errors: {self.error_count}", end="")
                await asyncio.sleep(1)
            
            # Stop all tasks
            self.running = False
            
            # Wait for all tasks to complete with timeout
            await asyncio.wait_for(asyncio.gather(*tasks, return_exceptions=True), timeout=5)
        
        end_time = time.time()
        actual_duration = end_time - start_time
        
        print(f"\n\n✅ Load test completed in {actual_duration:.2f} seconds")
        return actual_duration
    
    def generate_report(self, actual_duration):
        """Generate and print the test report"""
        print(f"\n{'='*60}")
        print(f"📊 TEST REPORT")
        print(f"{'='*60}")
        
        # Overall statistics
        total_requests = self.request_count + self.error_count
        success_rate = (self.request_count / total_requests * 100) if total_requests > 0 else 0
        
        print(f"\n📈 Overall Statistics:")
        print(f"  • Total Requests: {total_requests}")
        print(f"  • Successful Requests: {self.request_count}")
        print(f"  • Failed Requests: {self.error_count}")
        print(f"  • Success Rate: {success_rate:.2f}%")
        print(f"  • Requests per second: {total_requests / actual_duration:.2f}")
        
        # Response time statistics
        all_response_times = []
        for user_results in self.results.values():
            for result in user_results:
                if 'response_time' in result:
                    all_response_times.append(result['response_time'])
        
        if all_response_times:
            print(f"\n⏱️  Response Time Statistics (ms):")
            print(f"  • Average: {statistics.mean(all_response_times):.2f} ms")
            print(f"  • Median: {statistics.median(all_response_times):.2f} ms")
            print(f"  • Min: {min(all_response_times):.2f} ms")
            print(f"  • Max: {max(all_response_times):.2f} ms")
            print(f"  • 95th Percentile: {statistics.quantiles(all_response_times, n=20)[18]:.2f} ms")
            print(f"  • 99th Percentile: {statistics.quantiles(all_response_times, n=100)[98]:.2f} ms")
        
        # Status code breakdown
        status_codes = defaultdict(int)
        for user_results in self.results.values():
            for result in user_results:
                if 'status' in result:
                    status_codes[str(result['status'])] += 1
        
        if status_codes:
            print(f"\n🔢 Status Code Breakdown:")
            for code, count in sorted(status_codes.items()):
                percentage = (count / total_requests * 100) if total_requests > 0 else 0
                print(f"  • {code}: {count} ({percentage:.1f}%)")
        
        print(f"\n{'='*60}\n")

async def main():
    # Configuration
    URL = "https://httpbin.org/get"  # Replace with your target URL
    NUM_USERS = 50
    DURATION_SECONDS = 180  # 3 minutes
    
    # Create load tester instance
    tester = LoadTester(URL, NUM_USERS, DURATION_SECONDS)
    
    # Set up signal handler for Ctrl+C
    signal.signal(signal.SIGINT, tester.signal_handler)
    
    try:
        # Run the test
        actual_duration = await tester.run_test()
        
        # Generate report
        tester.generate_report(actual_duration)
        
    except Exception as e:
        print(f"\n❌ Error during test: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Run the async main function
    asyncio.run(main())