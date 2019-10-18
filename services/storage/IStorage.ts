export interface IStorageService {
    // @ts-ignore
    setLocalForage(localForage: LocalForage) : void;
    getLocalForageStorage<T>(namespace: string): OkunaStorage<T>;
}
