import { PlayerPositionLogInterface } from '../../interface/player-position-log.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from '../../projects/dto/project-response.dto';
import { PlaySessionResponseDto } from '../../play-session/dto/create-play-session.dto';

export class PlayPositionLogResponseDto implements PlayerPositionLogInterface {
    @ApiProperty({ required: true, minimum: 1 })
    project: ProjectResponseDto;

    @ApiProperty({ required: true, minimum: 1 })
    session: PlaySessionResponseDto;

    @ApiProperty({ required: true, minimum: 1 })
    x: number;

    @ApiProperty({ required: true, minimum: 1 })
    y: number;

    @ApiProperty({ required: false, nullable: true })
    z?: number;

    @ApiProperty({
        required: true,
        minimum: 1,
        type: 'integer',
        name: 'offset_timestamp',
    })
    offsetTimestamp: number;

    @ApiProperty({ required: false, nullable: true, name: 'location' })
    location?: string;
}
