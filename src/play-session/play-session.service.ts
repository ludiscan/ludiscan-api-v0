import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaySessionDto } from './dto/create-play-session.dto';
import { PlaySession } from '/src/database/entities/play-session.entity';
import { RaiseNotFoundException } from '/src/common/exception/ludiscan-exception';
import { ProjectsService } from '/src/projects/projects.service';

@Injectable()
export class PlaySessionService {
    constructor(
        @InjectRepository(PlaySession)
        private readonly playSessionRepository: Repository<PlaySession>,
        private readonly projectsService: ProjectsService,
    ) {}

    async findAll(): Promise<PlaySession[]> {
        return this.playSessionRepository.find({
            relations: ['project', 'user'],
        });
    }

    async findOne(id: number): Promise<PlaySession> {
        const session = await this.playSessionRepository.findOne({
            where: { id },
            relations: ['project', 'user'],
        });
        if (!session) {
            RaiseNotFoundException();
        }
        return session;
    }

    async create(
        projectId: number,
        playSessionData: CreatePlaySessionDto,
    ): Promise<PlaySession> {
        const newSession = this.playSessionRepository.create(playSessionData);
        return this.playSessionRepository.save(newSession);
    }

    async update(
        id: number,
        playSessionData: Partial<PlaySession>,
    ): Promise<PlaySession> {
        const session = await this.findOne(id);
        Object.assign(session, playSessionData);
        return this.playSessionRepository.save(session);
    }

    async delete(id: number): Promise<void> {
        const session = await this.findOne(id);
        await this.playSessionRepository.remove(session);
    }
}
