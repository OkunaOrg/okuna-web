import { singleton } from '~/node_modules/tsyringe';
import { AxiosInstance, AxiosPromise } from '~/node_modules/axios';
import { Client as OkunaClient } from 'okuna';
import RequestStrategy from '~/node_modules/okuna/lib/utils/requestStrategies/core';

@singleton()
export class ApiClientService {
    private axios!: AxiosInstance;
    private okunaClient!: OkunaClient;

    setAxiosClient(axios: AxiosInstance) {
        this.axios = axios;
        this.okunaClient = new OkunaClient({
            requestStrategy: new AxiosInstanceStrategy(this.axios)
        });
    }

    getClient() {
        if (!this.okunaClient) throw new Error('Client has not been initialized');
        return this.okunaClient;
    }
}

class AxiosInstanceStrategy extends RequestStrategy {
    constructor(private axiosInstance: AxiosInstance) {
        super('axiosInstance');
    }

    get(url: string, opts: object): AxiosPromise {
        return this.axiosInstance.get(url, opts);
    }

    post(url: string, body: object | string | FormData, opts: object): AxiosPromise {
        return this.axiosInstance.post(url, body, opts);
    }

    put(url: string, body: object | string | FormData, opts: object): AxiosPromise {
        return this.axiosInstance.put(url, body, opts);
    }

    patch(url: string, body: object | string | FormData, opts: object): AxiosPromise {
        return this.axiosInstance.patch(url, body, opts);
    }

    delete(url: string, opts: object): AxiosPromise {
        return this.axiosInstance.delete(url, opts);
    }
}