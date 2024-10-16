import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exception/global-exception-filter';
import { setupSwagger } from './common/swagger/setup-swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    app.useGlobalFilters(new GlobalExceptionFilter());

    setupSwagger(app);

    await app.listen(3000);
}
bootstrap();
