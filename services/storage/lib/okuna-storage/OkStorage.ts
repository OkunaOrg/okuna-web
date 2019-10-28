import { IStore } from '~/services/storage/lib/stores/IStore';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';

export class OkStorage<T> implements IOkStorage<T> {

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
