import { IStorageService } from '~/services/storage/IStorageService';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import okunaStorageFactory from '~/services/storage/lib/okuna-storage/factory';
import { injectable } from '~/node_modules/inversify';

@injectable()
export class StorageService implements IStorageService {
    // @ts-ignore
    private localForage: LocalForage;

    constructor() {
    }

    // @ts-ignore
    setLocalForage(localForage: LocalForage) {
        this.localForage = localForage;
    }

    getLocalForageStorage<T>(namespace: string): IOkStorage<T> {
        if (!this.localForage) throw new Error('this.localForage is undefined');

        return okunaStorageFactory.makeLocalForage<T>(
            namespace,
            this.localForage
        );
    }
}




