import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('robots.txt')
    @Header('content-type', 'text/plain')
    getRobots(): string {
        return this.appService.getRobots();
    }
}
