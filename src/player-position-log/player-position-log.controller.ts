import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { v0Endpoint } from '../common/paths';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlayPositionLogPostPipe } from './tasks/play-position-log-post.pipe';
import { PlayPositionLogDto } from './dto/play-position-log.dto';
import { PlayerPositionLogService } from './player-position-log.service';
import { DefaultSuccessResponse } from '../common/model/default';
import { ProjectsService } from '../projects/projects.service';
import { PlaySessionService } from '../play-session/play-session.service';

@ApiTags(v0Endpoint.tag)
@Controller(v0Endpoint.playerPositionLog.root)
export class PlayerPositionLogController {
    constructor(
        private readonly positionService: PlayerPositionLogService,
        private readonly projectService: ProjectsService,
        private readonly sessionService: PlaySessionService,
    ) {}
    @Get()
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [PlayPositionLogDto],
    })
    async get(
        @Param(v0Endpoint.playerPositionLog.project_id) projectId: number,
        @Param(v0Endpoint.playerPositionLog.play_session_id) sessionId: number,
    ): Promise<PlayPositionLogDto[]> {
        const project = await this.projectService.findOne(projectId);
        const session = await this.sessionService.findOne(projectId, sessionId);
        return this.positionService.findAll(project, session);
    }

    @Post()
    @UsePipes(PlayPositionLogPostPipe)
    @ApiResponse({
        status: 201,
        description: 'Created',
        type: DefaultSuccessResponse,
    })
    async post(
        @Param(v0Endpoint.playerPositionLog.project_id) projectId: number,
        @Param(v0Endpoint.playerPositionLog.play_session_id) sessionId: number,
        @Body() positions: PlayPositionLogDto[],
    ) {
        console.log(positions);
        const project = await this.projectService.findOne(projectId);
        const session = await this.sessionService.findOne(projectId, sessionId);
        await this.positionService.savePositions(project, session, positions);
        return new DefaultSuccessResponse();
    }
}
