// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    create(firstName: string, lastName: string): Promise<User> {
        return this.usersRepository.save({
            firstName: firstName,
            lastName: lastName,
            isActive: true,
        });
    }

    // 他のメソッド（作成、更新、削除など）
}
