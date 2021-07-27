import { IStore } from '~/services/storage/lib/stores/IStore';

export class LocalStorageStore<T> implements IStore<T> {
    // @ts-ignore
    constructor(private localStorage: Storage) {
    }

    clear(): Promise<void> {
        return Promise.resolve(this.localStorage.clear());
    }

    get(key: string): Promise<T> {
        return Promise.resolve(JSON.parse(this.localStorage.getItem(key)));
    }

    set(key: string, value: T): Promise<void> {
        return Promise.resolve(this.localStorage.setItem(key, JSON.stringify(value)));
    }

    has(key: string): Promise<boolean> {
        const item = this.localStorage.getItem(key);
        return Promise.resolve(typeof item !== 'undefined' && item !== null);
    }

    remove(key: string): Promise<T> {
        const item = this.get(key);
        this.localStorage.removeItem(key);
        return Promise.resolve(item);
    }

    keys(): Promise<string[]> {
        return Promise.resolve(Object.keys(this.localStorage));
    }
}
