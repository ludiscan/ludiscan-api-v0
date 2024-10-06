import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaySessionService } from './play-session.service';
import { PlaySession } from '/src/database/entities/play-session.entity';
import { CreatePlaySessionDto } from './dto/create-play-session.dto';
import { v0Endpoint } from '/src/common/paths';

@Controller(v0Endpoint.playSession.root)
@ApiTags(v0Endpoint.tag)
export class PlaySessionController {
    constructor(private readonly playSessionService: PlaySessionService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: [PlaySession],
    })
    async findAll(): Promise<PlaySession[]> {
        return this.playSessionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PlaySession> {
        return this.playSessionService.findOne(id);
    }

    @Post()
    async create(
        @Body() playSessionData: CreatePlaySessionDto,
    ): Promise<PlaySession> {
        return this.playSessionService.create(1, playSessionData);
    }

    // @Put(':id')
    // async update(
    //     @Param('id') id: number,
    //     @Body() playSessionData: Partial<PlaySession>,
    // ): Promise<PlaySession> {
    //     return this.playSessionService.update(id, playSessionData);
    // }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.playSessionService.delete(id);
    }
}
