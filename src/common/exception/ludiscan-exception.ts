import { HttpException, HttpStatus } from '@nestjs/common';

export class LudiscanException extends HttpException {
    constructor(message: string, errorCode: number, statusCode: number) {
        super(
            {
                statusCode: statusCode,
                errorCode: errorCode,
                message: message || 'Bad Request',
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}

export function RaiseException<T extends LudiscanException>(
    exception: T,
): void {
    throw exception;
}
