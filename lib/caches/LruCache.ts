import ICache from '~/lib/caches/ICache';
import { LRUMap } from '~/node_modules/lru_map';

export class LruCache<K,V> implements ICache<K,V>{
    private cache: LRUMap<K, V>;

    constructor(limit: number){
        this.cache = new LRUMap(limit);
    }

    set(key :K, value :V) : void{
        this.cache.set(key, value);
    }

    get(key :K) : V | undefined{
        return this.cache.get(key);
    }
}