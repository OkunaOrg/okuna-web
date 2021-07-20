import { IStorageService, StorageContainer } from '~/services/storage/IStorageService';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import okunaStorageFactory from '~/services/storage/lib/okuna-storage/factory';
import { injectable } from '~/node_modules/inversify';

@injectable()
export class StorageService implements IStorageService {
    private storage: StorageContainer;

    constructor() {
    }

    setStorage(storage: StorageContainer) {
        this.storage = storage
    }

    getStorage<T>(namespace: string): IOkStorage<T> {
        if (!this.storage) throw new Error('this.storage is undefined');

        return this.storage instanceof Storage
            ? okunaStorageFactory.makeLocalStorage<T>(
                namespace,
                this.storage
            )
            : okunaStorageFactory.makeLocalForage<T>(
                namespace,
                this.storage
            );
    }
}
