import type { Country } from "@/shared/types/common.types";

type cacheEntry = {
    data: Country[],
    timestamp: number
}

class MemoryCache {
    private cache: Map<string, { data: any; timestamp: number }>
    private ttl: number 

    constructor(ttl = 60000) {
        this.ttl = ttl
        this.cache = new Map()  
    }

    set<T>(key: string, data: T):void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        })
    }

    get<T>(key: string): T | null {
        
        const entry:cacheEntry | undefined = this.cache.get(key)
   
        if (!entry) return null
        
        const isExpired: boolean = Date.now() - entry.timestamp > this.ttl
        if (isExpired) {
            this.cache.delete(key)
            return null
        }
        
        return entry.data as T
    }

    has(key: string):boolean {
        return this.cache.has(key)
    }

    delete(key: string):boolean {
        return this.cache.delete(key)
    }
}
export default MemoryCache