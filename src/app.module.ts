import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/database.config';
import configuration from './config/configuration';
import Joi from 'joi';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { PlaySessionModule } from 'src/play-session/play-session.module';
import { PlayerPositionLogModule } from './player-position-log/player-position-log.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().default(5432),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                DATABASE_DB: Joi.string().required(),
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
            }),
            envFilePath: ['.env'], // 環境変数ファイルのパス
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
        }),
        UsersModule,
        ProjectsModule,
        PlaySessionModule,
        PlayerPositionLogModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
