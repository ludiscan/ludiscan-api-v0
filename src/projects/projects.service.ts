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

    async findOne(id: number): Promise<Project> {
        return await this.projectRepository.findOne({
            where: { id },
        });
    }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepository.create();
        Object.assign(project, createProjectDto);
        return await this.projectRepository.save(project);
    }
}
