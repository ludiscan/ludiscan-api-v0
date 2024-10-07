import { PlaySessionInterface } from '/src/interface/play-session.interface';
import { ApiProperty } from '@nestjs/swagger';
import { PlaySession } from '../../database/entities/play-session.entity';

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

export class PlaySessionResponseDto {
    constructor(entity: PlaySession) {
        this.sessionId = entity.id;
        this.projectId = entity.project.id;
        this.name = entity.name;
        this.deviceId = entity.deviceId;
        this.platform = entity.platform;
        this.appVersion = entity.appVersion;
        this.metaData = entity.metaData;
        this.startTime = entity.startTime;
        this.endTime = entity.endTime;
        this.isPlaying = entity.endTime === null;
    }
    @ApiProperty({ name: 'session_id' })
    sessionId: number;

    @ApiProperty({ name: 'project_id' })
    projectId: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ name: 'device_id', nullable: true })
    deviceId?: string; // デバイス識別子

    @ApiProperty({ example: 'platform', nullable: true })
    platform?: string; // プラットフォーム情報

    @ApiProperty({ example: 'app_version', nullable: true })
    appVersion?: string; // アプリのバージョン情報

    @ApiProperty({ example: 'meta_data', nullable: true })
    metaData?: object; // その他のメタ情報

    @ApiProperty({ example: 'start_time' })
    startTime: Date;

    @ApiProperty({ example: 'end_time', nullable: true })
    endTime?: Date; // nullの場合はセッション継続中

    @ApiProperty({ example: 'is_playing', type: 'boolean' })
    isPlaying: boolean;
}
