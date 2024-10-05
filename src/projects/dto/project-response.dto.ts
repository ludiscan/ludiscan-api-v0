import { ProjectInterface } from '../../interface/project.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ProjectResponseDto implements ProjectInterface {
    constructor(
        id: number,
        name: string,
        description: string,
        createdAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;
}
