import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaySessionDto } from './dto/create-play-session.dto';
import { PlaySession } from '/src/database/entities/play-session.entity';
import { RaiseNotFoundException } from '/src/common/exception/ludiscan-exception';
import { Project } from '../database/entities/project.entity';

@Injectable()
export class PlaySessionService {
    constructor(
        @InjectRepository(PlaySession)
        private readonly playSessionRepository: Repository<PlaySession>,
    ) {}

    async findAll(project: Project): Promise<PlaySession[]> {
        return await this.playSessionRepository.find({
            where: { project },
            relations: ['project'],
            select: {
                id: true,
                project: {
                    id: true,
                },
                name: true,
                startTime: true,
                endTime: true,
                deviceId: true,
                platform: true,
                appVersion: true,
                metaData: {},
            },
        });
    }

    async findOne(projectId: number, sessionId: number): Promise<PlaySession> {
        const session = await this.playSessionRepository.findOne({
            where: { id: sessionId, project: { id: projectId } },
            relations: ['project'],
            select: {
                id: true,
                project: {
                    id: true,
                },
                name: true,
                startTime: true,
                endTime: true,
                deviceId: true,
                platform: true,
                appVersion: true,
                metaData: {},
            },
        });
        if (!session) {
            RaiseNotFoundException();
        }
        return session;
    }

    async create(
        project: Project,
        playSessionData: CreatePlaySessionDto,
    ): Promise<PlaySession> {
        if (!project) {
            RaiseNotFoundException();
        }
        const session = this.playSessionRepository.create();
        session.project = project;
        Object.assign(session, playSessionData);
        return this.playSessionRepository.save(session);
    }

    async finish(projectId: number, sessionId: number): Promise<PlaySession> {
        const session = await this.findOne(projectId, sessionId);
        session.endTime = new Date();
        return this.playSessionRepository.save(session);
    }

    async update(
        projectId: number,
        sessionId: number,
        playSessionData: Partial<PlaySession>,
    ): Promise<PlaySession> {
        const session = await this.findOne(projectId, sessionId);
        Object.assign(session, playSessionData);
        return this.playSessionRepository.save(session);
    }

    async delete(projectId: number, sessionId: number): Promise<void> {
        await this.findOne(projectId, sessionId);
        await this.playSessionRepository.delete(sessionId);
    }
}
