import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { v0Endpoint } from '../common/paths';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { PlayPositionLogDto } from './dto/play-position-log.dto';
import { PlayerPositionLogService } from './player-position-log.service';
import { DefaultSuccessResponse } from '../common/model/default';
import { ProjectsService } from '../projects/projects.service';
import { PlaySessionService } from '../play-session/play-session.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RaiseBadRequestException } from '../common/exception/ludiscan-exception';

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
    @UseInterceptors(FileInterceptor('file')) // 'file' はクライアント側で送信するフィールド名
    @ApiOperation({ summary: 'Upload binary player data' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description:
            'Binary data containing meta information and player positions',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Created',
        type: DefaultSuccessResponse,
    })
    async post(
        @Param(v0Endpoint.playerPositionLog.project_id, ParseIntPipe)
        projectId: string,
        @Param(v0Endpoint.playerPositionLog.play_session_id, ParseIntPipe)
        sessionId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            RaiseBadRequestException('No file uploaded');
        }

        console.log('Received file:', file);

        // バッファデータをカスタムパイプで解析する場合は、以下を使用
        // const positions: PlayPositionLogDto[] = this.playPositionLogPostPipe.transform(file.buffer);
        // もしくは直接解析
        const positions: PlayPositionLogDto[] = this.parseBuffer(file.buffer);

        console.log('Parsed positions:', positions);

        // サービス層への保存処理
        // const project = await this.projectService.findOne(projectId);
        // const session = await this.sessionService.findOne(projectId, sessionId);
        // await this.positionService.savePositions(project, session, positions);

        return new DefaultSuccessResponse();
    }

    private parseBuffer(buffer: Buffer): PlayPositionLogDto[] {
        let offset = 0;
        const positions: PlayPositionLogDto[] = [];

        try {
            // メタ情報の解析
            if (buffer.length < 8) {
                // players (4バイト) + stampcount (4バイト)
                RaiseBadRequestException(
                    'Insufficient data for meta information',
                );
            }

            const players = buffer.readInt32LE(offset);
            offset += 4;
            const stampcount = buffer.readInt32LE(offset);
            offset += 4;

            const expectedSize = 8 + players * stampcount * 24; // 24バイト = 4 + 4 + 4 + 4 + 8
            if (buffer.length < expectedSize) {
                RaiseBadRequestException(
                    'Insufficient data for player positions',
                );
            }

            for (let i = 0; i < stampcount; i++) {
                for (let p = 0; p < players; p++) {
                    const player = buffer.readInt32LE(offset);
                    offset += 4;

                    const x = buffer.readFloatLE(offset);
                    offset += 4;

                    const y = buffer.readFloatLE(offset);
                    offset += 4;

                    let z: number | undefined = undefined;
                    z = buffer.readFloatLE(offset);
                    offset += 4;

                    const offsetTimestamp = Number(
                        buffer.readBigUInt64LE(offset),
                    );
                    offset += 8;

                    positions.push({
                        player,
                        x,
                        y,
                        z,
                        offsetTimestamp,
                    });
                }
            }

            return positions;
        } catch (error: unknown) {
            RaiseBadRequestException(
                'Invalid binary data format: ' + (error as Error).message,
            );
        }
    }
}
