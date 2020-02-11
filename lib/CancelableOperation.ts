export class CancelableOperation<T = void> {
    static fromPromise<Y=void>(promise: Promise<Y>): CancelableOperation<Y> {
        return new CancelableOperation<Y>({
            promise
        });
    }

    private _value: Promise<T>;
    private _isCancelled = false;
    private _isCompleted = false;

    constructor(private config: CancelableOperationConfig<T>) {
        this._value = new Promise<T>((resolve, reject) => {
            config.promise.then((...args: any[]) => {
                if (this._isCancelled) return;
                this._isCompleted = true;
                resolve(...args);
            }, (error)=>{
                if (this._isCancelled) return;
                this._isCompleted = false;
                reject(error);
            });
        });
    }

    get value() {
        return this._value;
    }

    cancel(): void {
        this._isCancelled = true;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    get isCancelled() {
        return this._isCancelled;
    }

}


interface CancelableOperationConfig<T> {
    promise: Promise<T>
}

