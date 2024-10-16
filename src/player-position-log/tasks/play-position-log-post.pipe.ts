import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PlayerPositionLogInterface } from '../../interface/player-position-log.interface';
import { PlayPositionLogDto } from '../dto/play-position-log.dto';

@Injectable()
export class PlayPositionLogPostPipe implements PipeTransform {
    transform(buffer: Buffer): PlayPositionLogDto[] {
        const positions: PlayerPositionLogInterface[] = [];
        let offset = 0;

        try {
            while (offset < buffer.length) {
                const x = buffer.readFloatLE(offset);
                offset += 4;
                const y = buffer.readFloatLE(offset);
                offset += 4;
                const z = buffer.readFloatLE(offset);
                offset += 4;
                const timestamp = buffer.readBigUInt64LE(offset);
                offset += 8;

                positions.push({
                    x,
                    y,
                    z,
                    offsetTimestamp: Number(timestamp),
                });
            }
        } catch (error: unknown) {
            throw new BadRequestException('Invalid binary data format' + error);
        }

        return positions;
    }
}
