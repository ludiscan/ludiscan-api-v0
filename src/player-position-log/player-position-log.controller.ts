import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
} from '@nestjs/common';
import { v0Endpoint } from '../common/paths';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
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
        @Param(v0Endpoint.playerPositionLog.project_id, ParseIntPipe)
        projectId: string,
        @Param(v0Endpoint.playerPositionLog.play_session_id, ParseIntPipe)
        sessionId: string,
    ): Promise<PlayPositionLogDto[]> {
        const project = await this.projectService.findOne(Number(projectId));
        const session = await this.sessionService.findOne(
            Number(projectId),
            Number(sessionId),
        );
        return this.positionService.findAll(project, session);
    }

    @Post()
    @UsePipes(PlayPositionLogPostPipe)
    @ApiConsumes('application/octet-stream')
    @ApiOperation({ summary: 'Upload binary player data' })
    @ApiResponse({
        status: 201,
        description: 'Created',
        type: DefaultSuccessResponse,
    })
    @ApiBody({
        description: 'Binary data',
        required: true,
        schema: {
            type: 'string',
            format: 'binary',
        },
    })
    async post(
        @Param(v0Endpoint.playerPositionLog.project_id, ParseIntPipe)
        projectId: string,
        @Param(v0Endpoint.playerPositionLog.play_session_id, ParseIntPipe)
        sessionId: string,
        @Body() positions: PlayPositionLogDto[],
    ) {
        console.log(positions);
        const project = await this.projectService.findOne(Number(projectId));
        const session = await this.sessionService.findOne(
            Number(projectId),
            Number(sessionId),
        );
        await this.positionService.savePositions(project, session, positions);
        return new DefaultSuccessResponse();
    }
}
