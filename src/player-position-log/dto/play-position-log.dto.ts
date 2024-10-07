import { PlayerPositionLogInterface } from '../../interface/player-position-log.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PlayPositionLogDto implements PlayerPositionLogInterface {
    @ApiProperty({ required: true, minimum: 1 })
    x: number;

    @ApiProperty({ required: true, minimum: 1 })
    y: number;

    @ApiProperty({ required: false, nullable: true })
    z?: number;

    @ApiProperty({
        required: true,
        minimum: 1,
        type: 'bigint',
        name: 'offset_timestamp',
    })
    offsetTimestamp: bigint;

    @ApiProperty({ required: false, nullable: true, name: 'location' })
    location?: string;
}
