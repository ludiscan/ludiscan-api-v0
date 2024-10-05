import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from '../database/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}
    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find();
    }

    async create(createProjectDto: CreateProjectDto) {
        await this.projectRepository.insert({
            name: createProjectDto.name,
            description: createProjectDto.description,
        });
    }
}
