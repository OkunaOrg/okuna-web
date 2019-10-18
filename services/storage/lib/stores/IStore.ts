export interface IStore<T> {
    set(key: string, value: T): Promise<void>;

    get(key: string): Promise<T>;

    has(key: string): Promise<boolean>;

    remove(key: string): Promise<T>;

    keys(): Promise<string[]>;

    clear(): Promise<void>
}