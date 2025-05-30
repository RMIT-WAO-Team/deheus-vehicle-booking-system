export class CustomErrorDto extends Error {
    public statusCode: number;
    public data?: object;

    constructor(message: string, statusCode: number = 500, data?: object) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
