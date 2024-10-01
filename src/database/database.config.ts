import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const dbConfig = this.configService.get('database');
        return {
            type: 'postgres',
            host: dbConfig.host || 'localhost',
            port: dbConfig.port || 5432,
            username: dbConfig.user || 'postgres',
            password: dbConfig.password || 'postgres',
            database: dbConfig.database || 'test',
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            migrations: [join(__dirname, '**', 'migrations/**/*.ts')],
            synchronize: false, // 本番環境では必ずfalse
        };
    }
}
