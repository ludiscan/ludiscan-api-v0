import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { DefaultSuccessResponse } from '../common/model/default';
import { Project } from '../database/entities/project.entity';

@ApiTags('projects')
@Controller('/v0/projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    async findAll(): Promise<ProjectResponseDto[]> {
        const items = await this.projectsService.findAll();
        return items.map((item: Project) => {
            return new ProjectResponseDto(
                item.id,
                item.name,
                item.description,
                item.createdAt,
            );
        });
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Created',
        type: DefaultSuccessResponse,
    })
    async create(@Body() createProjectDto: CreateProjectDto) {
        await this.projectsService.create(createProjectDto);
        return new DefaultSuccessResponse();
    }
}
