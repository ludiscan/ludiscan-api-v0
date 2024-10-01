export interface AppConfig {
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        name: string;
    };
    // 他の設定
}

export default (): AppConfig => ({
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_DB,
    },
    // 他の設定
});
