import { IStorageService } from '~/services/storage/IStorage';
import { singleton } from '~/node_modules/tsyringe';
import { LocalForageStore } from '~/services/storage/lib/stores/LocalForage';
import { OkunaStorage } from '~/services/storage/lib/OkunaStorage';

@singleton()
class StorageService implements IStorageService {
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




