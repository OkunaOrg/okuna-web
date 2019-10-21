import { OkStorage } from '~/services/storage/lib/okuna-storage/OkStorage';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { LocalForageStore } from '~/services/storage/lib/stores/LocalForage';


const okunaStorageFactory = {
    makeLocalForage<T>(namespace: string, localForage: any): IOkStorage<T> {
        return new OkStorage(namespace, new LocalForageStore(localForage));
    }
};

export default okunaStorageFactory;