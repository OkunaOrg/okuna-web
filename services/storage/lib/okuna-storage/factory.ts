import { OkunaStorage } from '~/services/storage/lib/okuna-storage/OkunaStorage';
import { IOkunaStorage } from '~/services/storage/lib/okuna-storage/IOkunaStorage';
import { LocalForageStore } from '~/services/storage/lib/stores/LocalForage';


const okunaStorageFactory = {
    makeLocalForage<T>(namespace: string, localForage: any): IOkunaStorage<T> {
        return new OkunaStorage(namespace, new LocalForageStore(localForage));
    }
};

export default okunaStorageFactory;