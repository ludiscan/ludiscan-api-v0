import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { DefaultErrorResponse } from '../model/default';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const data = new DefaultErrorResponse();
        data.code = status;
        data.message = exceptionResponse['message'] || 'Internal Server Error';

        response.status(status).json(data);
    }
}
