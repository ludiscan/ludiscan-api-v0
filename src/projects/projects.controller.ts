import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { DefaultSuccessResponse } from 'src/common/model/default';
import { Project } from 'src/database/entities/project.entity';
import { v0Endpoint } from '../common/paths';

@ApiTags(v0Endpoint.tag)
@Controller(v0Endpoint.projects.root)
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
