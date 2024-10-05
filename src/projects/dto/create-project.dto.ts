import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProjectInterface } from '../../interface/project.interface';

export class CreateProjectDto implements ProjectInterface {
    @ApiProperty({ example: 'name' })
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'description' })
    readonly description: string;
}
