import { ApiProperty } from '@nestjs/swagger';

export interface ResponseInterface {
    code?: number;
    message?: string;
}

export class DefaultSuccessResponse implements ResponseInterface {
    @ApiProperty({ example: true, type: 'boolean' })
    success: boolean;

    @ApiProperty({ example: 'message', nullable: true, type: 'string' })
    message?: string;

    constructor() {
        this.success = true;
        this.message = 'success';
    }

    setSuccess(success: boolean) {
        this.success = success;
    }

    setMessage(message: string) {
        this.message = message;
    }
}

export class DefaultErrorResponse implements ResponseInterface {
    @ApiProperty({ example: 400 })
    code: number;

    @ApiProperty({ example: 'Bad Request' })
    message: string;

    @ApiProperty({ example: 'Invalid input data' })
    error: string;
}
