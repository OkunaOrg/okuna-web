export class CancelableOperation<T = void> {
    static fromPromise<T = void>(promise: Promise<T>): CancelableOperation<T> {
        return new CancelableOperation<T>({
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
                resolve();
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

