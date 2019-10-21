import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';

export interface IStorageService {
    // @ts-ignore
    setLocalForage(localForage: LocalForage): void;

    getLocalForageStorage<T>(namespace: string): IOkStorage<T>;
}
