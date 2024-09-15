import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_DB = process.env.DATABASE_DB;

if (
    !DATABASE_HOST ||
    !DATABASE_USER ||
    !DATABASE_PASSWORD ||
    !DATABASE_PORT ||
    !DATABASE_DB
) {
    throw new Error('Enviroment Database Error');
}

export default new DataSource({
    type: 'postgres',
    host: DATABASE_HOST || 'localhost',
    port: Number(DATABASE_PORT) || 5432,
    username: DATABASE_USER || 'postgres',
    password: DATABASE_PASSWORD || 'postgres',
    database: DATABASE_DB || 'test',
    entities: ['src/database/entities/*.entity.ts'],
    migrations: ['src/database/migrations/**/*.ts'], // フォルダを作成すること
    synchronize: false,
});
