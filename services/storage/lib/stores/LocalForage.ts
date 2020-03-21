import { IStore } from '~/services/storage/lib/stores/IStore';

export class LocalForageStore<T> implements IStore<T> {

    // @ts-ignore
    constructor(private localForage: LocalForage) {
    }

    clear(): Promise<void> {
        return this.localForage.clear();
    }

    get(key: string): Promise<T> {
        return this.localForage.getItem(key);
    }

    async has(key: string): Promise<boolean> {
        const item = await this.localForage.getItem(key);
        return typeof item !== 'undefined' && item !== null;
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
