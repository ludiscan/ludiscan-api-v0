import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaySessionService } from './play-session.service';
import { PlaySession } from '/src/database/entities/play-session.entity';
import {
    CreatePlaySessionDto,
    PlaySessionResponseDto,
} from './dto/create-play-session.dto';
import { v0Endpoint } from '/src/common/paths';
import { ProjectsService } from '../projects/projects.service';

@ApiTags(v0Endpoint.tag)
@Controller(v0Endpoint.playSession.root)
export class PlaySessionController {
    constructor(
        private readonly playSessionService: PlaySessionService,
        private readonly projectService: ProjectsService,
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [PlaySessionResponseDto],
    })
    async findAll(
        @Param(v0Endpoint.playSession.project_id) projectId: number,
    ): Promise<PlaySessionResponseDto[]> {
        const project = await this.projectService.findOne(projectId);
        return (await this.playSessionService.findAll(project)).map(
            (session) => new PlaySessionResponseDto(session),
        );
    }

    @Get(v0Endpoint.playSession.detail.path)
    async findOne(
        @Param(v0Endpoint.playSession.project_id) projectId: number,
        @Param(v0Endpoint.playSession.detail.id) id: number,
    ): Promise<PlaySessionResponseDto> {
        return new PlaySessionResponseDto(
            await this.playSessionService.findOne(projectId, id),
        );
    }

    @Post()
    async create(
        @Param(v0Endpoint.playSession.project_id) projectId: number,
        @Body() playSessionData: CreatePlaySessionDto,
    ): Promise<PlaySession> {
        const project = await this.projectService.findOne(projectId);
        return this.playSessionService.create(project, playSessionData);
    }

    @Post(v0Endpoint.playSession.finish.path)
    async finish(
        @Param(v0Endpoint.playSession.project_id) projectId: number,
        @Param(v0Endpoint.playSession.detail.id) id: number,
    ): Promise<PlaySession> {
        return this.playSessionService.finish(projectId, id);
    }

    // @Put(':id')
    // async update(
    //     @Param('id') id: number,
    //     @Body() playSessionData: Partial<PlaySession>,
    // ): Promise<PlaySession> {
    //     return this.playSessionService.update(id, playSessionData);
    // }

    @Delete(v0Endpoint.playSession.detail.path)
    async delete(
        @Param(v0Endpoint.playSession.project_id) projectId: number,
        @Param(v0Endpoint.playSession.detail.id) id: number,
    ): Promise<void> {
        return this.playSessionService.delete(projectId, id);
    }
}
