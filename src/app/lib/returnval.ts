import {HttpException} from "@nestjs/common";

export default class ReturnVal<T = any> {
    public success: boolean;
    public message: string;
    public data: T;
    public httpCode?: number;

    constructor(success: boolean, message: string, httpCode: number, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
        if (httpCode) {
            this.httpCode = httpCode;
        } else {
            this.httpCode = success ? 200 : 400;
        }
    }

    public static success<T>(data?: T, message?: string, httpCode?: number): ReturnVal<T> {
        if (!message) {
            message = 'Successful';
        }
        return new ReturnVal<T>(true, message, httpCode, data);
    }

    public static error(message?: string, httpCode = 400): ReturnVal {
        if (!message) {
            message = 'Error Occurred';
        }
        throw new HttpException(message, httpCode)
    }


}
