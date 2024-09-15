import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const configService = new ConfigService();
        return {
            type: 'postgres',
            host: configService.get('DATABASE_HOST') || 'localhost',
            port: configService.get('DATABASE_PORT') || 5432,
            username: configService.get('DATABASE_USER') || 'postgres',
            password: configService.get('DATABASE_PASSWORD') || 'postgres',
            database: configService.get('DATABASE_DB') || 'test',
            entities: ['src/database/entities/*.entity.ts'],
            migrations: ['src/database/migrations/**/*.ts'],
            synchronize: false, // 本番環境では必ずfalse
        };
    }
}
