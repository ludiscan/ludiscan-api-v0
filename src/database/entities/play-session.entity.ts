import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
import { PlaySessionInterface } from '../../interface/play-session.interface';
import { IsString, MinLength } from 'class-validator';

@Entity('play_sessions')
export class PlaySession implements PlaySessionInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => User, (user) => user.id, { nullable: true })
    user?: User;

    @Column()
    @IsString()
    @MinLength(1)
    name: string;

    @Column({ nullable: true })
    deviceId?: string; // デバイス識別子

    @Column({ nullable: true })
    platform?: string; // プラットフォーム情報

    @Column({ nullable: true })
    appVersion?: string; // アプリのバージョン情報

    @Column('jsonb', { nullable: true })
    metaData?: object; // その他のメタ情報

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ nullable: true })
    endTime?: Date; // nullの場合はセッション継続中
}
