
const rateLimitMap = new Map<string, number[]>();

//example rateLimitMap structure
// rateLimitMap.set("127.0.0.1", [1737999999999, 1737999999999, 1737999999999]);

setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap) {
        const windowTime = 60 * 1000;

  
        const recentRequests = timestamps.filter(timestamp => now - timestamp < windowTime);

        if (recentRequests.length === 0) {
            rateLimitMap.delete(ip);

            
    
        } else if (recentRequests.length !== timestamps.length) { 
            rateLimitMap.set(ip, recentRequests);
        }
    }
}, 60 * 1000); // Clean up every minute


export function checkRateLimit(ip: string): boolean {
    const currentTimestamp = Date.now();
    const windowTime = 60 * 1000; // 1 minute

    const requestTimestamps = rateLimitMap.get(ip) || [];
    const recentRequests = requestTimestamps.filter(timestamp => currentTimestamp - timestamp < windowTime);

    if (recentRequests.length >= 3) {
        return false;
    }

    recentRequests.push(currentTimestamp);
    rateLimitMap.set(ip, recentRequests);

    return true;
}
