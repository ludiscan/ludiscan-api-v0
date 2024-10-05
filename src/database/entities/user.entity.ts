import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../../interface/user.interface';

@Entity('users')
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;
}
