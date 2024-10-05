import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserInterface } from '../../interface/user.interface';

export class CreateUserDto implements UserInterface {
    @ApiProperty({ example: 'name' })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @MinLength(1)
    password: string;

    @ApiProperty()
    @IsEmail()
    @MinLength(1)
    email: string;
}
