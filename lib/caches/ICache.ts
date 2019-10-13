
export default interface ICache<K,V>{
    set(key :K, value :V) : void;

    get(key :K) : V | undefined;
}