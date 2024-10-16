import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

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

function RaiseExceptionOfType<T extends HttpException>(type: {
    new (): T;
}): void {
    throw new type();
}

export function RaiseNotFoundException(): void {
    RaiseExceptionOfType(NotFoundException);
}

export function RaiseBadRequestException(message: string): void {
    RaiseException(new LudiscanException(message, 400, 400));
}
