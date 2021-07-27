import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';

// @ts-ignore
export type StorageContainer = LocalForage | Storage;

export interface IStorageService {
    setStorage(storage: StorageContainer): void;
    getStorage<T>(namespace: string): IOkStorage<T>;
}
