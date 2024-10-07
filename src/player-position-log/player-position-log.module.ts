import { Module } from '@nestjs/common';
import { PlayerPositionLogController } from './player-position-log.controller';
import { PlayerPositionLogService } from './player-position-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerPositionLog } from '../database/entities/player-position-log.entity';
import { ProjectsModule } from '../projects/projects.module';
import { PlaySessionModule } from '../play-session/play-session.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerPositionLog]),
        ProjectsModule,
        PlaySessionModule,
    ],
    controllers: [PlayerPositionLogController],
    providers: [PlayerPositionLogService],
})
export class PlayerPositionLogModule {}
