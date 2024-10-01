// src/users/users.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../database/entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'すべてのユーザーを取得' })
    @ApiResponse({ status: 200, description: '成功', type: [User] })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '特定のユーザーを取得' })
    @ApiResponse({ status: 200, description: '成功', type: User })
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'ユーザーを作成' })
    @ApiResponse({ status: 201, description: '成功', type: User })
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        console.log(createUserDto);
        return this.usersService.create(
            createUserDto.firstName,
            createUserDto.lastName,
        );
    }
    // 他のエンドポイント
}
