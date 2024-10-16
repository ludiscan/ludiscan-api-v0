import { PipeTransform, Injectable } from '@nestjs/common';
import { PlayerPositionLogInterface } from '../../interface/player-position-log.interface';
import { PlayPositionLogDto } from '../dto/play-position-log.dto';
import { RaiseBadRequestException } from '../../common/exception/ludiscan-exception';

@Injectable()
export class PlayPositionLogPostPipe implements PipeTransform {
    transform(buffer: Buffer): PlayPositionLogDto[] {
        let offset = 0;
        const positions: PlayerPositionLogInterface[] = [];

        try {
            // メタ情報の解析
            if (buffer.length < 8) {
                // players (4バイト) + stampcount (4バイト)
                RaiseBadRequestException(
                    'Insufficient data for meta information',
                );
            }

            const players = buffer.readInt32LE(offset);
            offset += 4;
            const stampcount = buffer.readInt32LE(offset);
            offset += 4;

            const expectedSize = 8 + players * stampcount * 24; // 24バイト = 4+4+4+4+8
            if (buffer.length < expectedSize) {
                RaiseBadRequestException(
                    'Insufficient data for player positions',
                );
            }

            for (let i = 0; i < stampcount; i++) {
                for (let p = 0; p < players; p++) {
                    const player = buffer.readInt32LE(offset);
                    offset += 4;

                    const x = buffer.readFloatLE(offset);
                    offset += 4;

                    const y = buffer.readFloatLE(offset);
                    offset += 4;

                    let z: number | undefined = undefined;
                    // Z座標がオプションの場合、必要に応じて読み取る
                    // ここでは必須と仮定
                    z = buffer.readFloatLE(offset);
                    offset += 4;

                    const offsetTimestamp = Number(
                        buffer.readBigUInt64LE(offset),
                    );
                    offset += 8;

                    positions.push({
                        player,
                        x,
                        y,
                        z,
                        offsetTimestamp,
                    });
                }
            }

            return positions;
        } catch (error: unknown) {
            RaiseBadRequestException(
                'Invalid binary data format: ' + (error as Error).message,
            );
        }
    }
}
