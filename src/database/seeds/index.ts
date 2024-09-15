import { readdirSync } from 'fs';
import { join } from 'path';

// シードディレクトリのパスを指定
const seedDirectory = join(__dirname);

// ディレクトリから*.seed.tsファイルを取得
const seedFiles = readdirSync(seedDirectory).filter((file) =>
    file.endsWith('.seed.ts'),
);

// シードファイルの実行
(async () => {
    for (const file of seedFiles) {
        console.log(`Running seed file: ${file}`);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const seed = require(join(seedDirectory, file));
        if (seed && seed.default) {
            await seed.default(); // デフォルトエクスポートを呼び出す
        }
    }
    console.log('All seeds have been executed.');
})();
