import { Module } from '@nestjs/common';
import { Project } from '../database/entities/project.entity';
import { Projects } from './projects';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectsController],
    providers: [Projects, ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsModule {}
