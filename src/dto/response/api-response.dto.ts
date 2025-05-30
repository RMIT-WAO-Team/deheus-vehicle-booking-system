export class ApiResponse<T> {
    constructor(
        public status: number,
        public message: string,
        public error: any,
        public data: T,
        public meta?: Record<string, any>
    ) {}
}

export class ResponseBuilder<T> {
    private _status = 200;
    private _message = 'Success';
    private _error: any = null;
    private _data!: T; // will be set via withData
    private _meta?: Record<string, any>;

    static create<T>(): ResponseBuilder<T> {
        return new ResponseBuilder<T>();
    }

    withStatus(status: number): this {
        this._status = status;
        return this;
    }

    withMessage(message: string): this {
        this._message = message;
        return this;
    }

    withError(error: any): this {
        this._error = error;
        return this;
    }

    withData(data: T): this {
        this._data = data;
        return this;
    }

    withMeta(meta: Record<string, any>): this {
        this._meta = meta;
        return this;
    }

    build(): ApiResponse<T> {
        return new ApiResponse<T>(this._status, this._message, this._error, this._data, this._meta);
    }
}
