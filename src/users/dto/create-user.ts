import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'lastName' })
    @IsString()
    @MinLength(1)
    lastName: string;

    @ApiProperty({ example: 'firstName' })
    @IsString()
    @MinLength(1)
    firstName: string;

    // 他のプロパティ
}
