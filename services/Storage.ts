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
    constructor(private namespace: string, private store: IStore<T>) {
    }

    clear(): Promise<T> {
        return this.store.clear();
    }

    get(key: string): Promise<T> {
        return this.store.get(this.makeKey(key));
    }

    remove(key: string): Promise<T> {
        return this.store.remove(this.makeKey(key));
    }

    set(key: string, value: T): Promise<T> {
        return this.store.set(this.makeKey(key), value);
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

    clear(): Promise<T> {
        return this.localForage.clear();
    }

    get(key: string): Promise<T> {
        return this.localForage.getItem(key);
    }

    remove(key: string): Promise<T> {
        return this.localForage.removeItem(key);
    }

    set(key: string, value: T): Promise<T> {
        return this.localForage.setItem(key, value);
    }

}


interface IStore<T> {
    set(key: string, value: T): Promise<T>;

    get(key: string): Promise<T>;

    remove(key: string): Promise<T>;

    clear(): Promise<T>
}