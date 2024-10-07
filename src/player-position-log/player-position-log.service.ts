import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerPositionLog } from '../database/entities/player-position-log.entity';
import { PlayPositionLogDto } from './dto/play-position-log.dto';
import { Project } from '../database/entities/project.entity';
import { PlaySession } from '../database/entities/play-session.entity';

@Injectable()
export class PlayerPositionLogService {
    constructor(
        @InjectRepository(PlayerPositionLog)
        private readonly repository: Repository<PlayerPositionLog>,
    ) {}

    async savePositions(
        project: Project,
        session: PlaySession,
        positions: PlayPositionLogDto[],
    ) {
        const entities = positions.map((position) => {
            const entity = this.repository.create();
            entity.project = project;
            entity.session = session;
            Object.assign(entity, position);
            return entity;
        });

        await this.repository.save(entities);
    }

    async findAll(
        project: Project,
        session: PlaySession,
    ): Promise<PlayPositionLogDto[]> {
        return await this.repository.find({
            where: { project, session },
            select: {
                x: true,
                y: true,
                z: true,
                offsetTimestamp: true,
                location: true,
            },
        });
    }
}
