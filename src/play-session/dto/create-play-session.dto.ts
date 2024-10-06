import { PlaySessionInterface } from '/src/interface/play-session.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaySessionDto implements PlaySessionInterface {
    @ApiProperty({ required: true, minimum: 1 })
    name: string;

    @ApiProperty({ required: false, nullable: true })
    deviceId?: string;

    @ApiProperty({ required: false, nullable: true })
    platform?: string;

    @ApiProperty({ required: false, nullable: true })
    appVersion?: string;
}
