
export interface IOkStorage<T> {
    clear(): Promise<void>;

    get(key: string): Promise<T>;

    has(key: string): Promise<boolean>;

    remove(key: string): Promise<void>;

    set(key: string, value: T): Promise<void>;
}
