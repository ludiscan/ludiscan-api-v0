import { Module } from '@nestjs/common';
import { PlaySessionService } from './play-session.service';
import { PlaySessionController } from './play-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaySession } from '/src/database/entities/play-session.entity';
import { ProjectsModule } from '/src/projects/projects.module';

@Module({
    imports: [TypeOrmModule.forFeature([PlaySession]), ProjectsModule],
    providers: [PlaySessionService],
    controllers: [PlaySessionController],
    exports: [PlaySessionService],
})
export class PlaySessionModule {}
