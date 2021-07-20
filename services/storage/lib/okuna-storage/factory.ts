import { OkStorage } from '~/services/storage/lib/okuna-storage/OkStorage';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { LocalForageStore } from '~/services/storage/lib/stores/LocalForage';
import { LocalStorageStore } from '../stores/LocalStorage';

const okunaStorageFactory = {
    makeLocalForage<T>(namespace: string, localForage: any): IOkStorage<T> {
        return new OkStorage(namespace, new LocalForageStore(localForage));
    },

    makeLocalStorage<T>(namespace: string, localStorage: Storage): IOkStorage<T> {
        return new OkStorage(namespace, new LocalStorageStore(localStorage));
    }
};

export default okunaStorageFactory;
