class StorageService {
    // @ts-ignore
    private localForage: LocalForage;

    // @ts-ignore
    setLocalForage(localForage: LocalForage) {
        this.localForage = localForage;
    }

    getLocalForageStorage<T>(namespace: string): OkunaStorage<T> {
        if (!this.localForage) throw new Error('this.localForage is undefined');

        return new OkunaStorage(
            namespace,
            new LocalForageStore(this.localForage)
        );
    }
}


class OkunaStorage<T> {

    private storedKeys: string[];

    constructor(private namespace: string, private store: IStore<T>) {
        this.storedKeys = [];
    }

    async clear(): Promise<void> {
        await Promise.all(this.storedKeys.map((storedKey) => {
            return this.remove(storedKey);
        }));
    }

    get(key: string): Promise<T> {
        return this.store.get(this.makeKey(key));
    }

    has(key: string): Promise<boolean> {
        return this.store.has(this.makeKey(key));
    }

    async remove(key: string): Promise<void> {
        const keyToRemove = this.makeKey(key);
        await this.store.remove(keyToRemove);

        const index = this.storedKeys.indexOf(keyToRemove, 0);
        if (index > -1) {
            this.storedKeys.splice(index, 1);
        }
    }

    async set(key: string, value: T): Promise<void> {
        const keyToStore = this.makeKey(key);
        await this.store.set(keyToStore, value);
        this.storedKeys.push(keyToStore);
    }

    private makeKey(key: string) {
        if (!this.namespace) return key;
        return `${this.namespace}.${key}`;
    }

}

class LocalForageStore<T> implements IStore<T> {

    // @ts-ignore
    constructor(private localForage: LocalForage) {
    }

    clear(): Promise<void> {
        return this.localForage.clear();
    }

    get(key: string): Promise<T> {
        return this.localForage.getItem(key);
    }

    has(key: string): Promise<boolean> {
        return this.localForage.hasItem(key);
    }

    remove(key: string): Promise<T> {
        return this.localForage.removeItem(key);
    }

    set(key: string, value: T): Promise<void> {
        return this.localForage.setItem(key, value);
    }

    keys(): Promise<string[]> {
        return this.localForage.keys();
    }

}


interface IStore<T> {
    set(key: string, value: T): Promise<void>;

    get(key: string): Promise<T>;

    has(key: string): Promise<boolean>;

    remove(key: string): Promise<T>;

    keys(): Promise<string[]>;

    clear(): Promise<void>
}