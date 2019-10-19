import { IOkunaStorage } from '~/services/storage/lib/okuna-storage/IOkunaStorage';

export interface IStorageService {
    // @ts-ignore
    setLocalForage(localForage: LocalForage): void;

    getLocalForageStorage<T>(namespace: string): IOkunaStorage<T>;

    getIdentifier(): number;
}
