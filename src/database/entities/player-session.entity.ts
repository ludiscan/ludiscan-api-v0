import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('player_sessions')
export class PlayerSession {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => User, (user) => user.id, { nullable: true })
    user: User;

    @Column({ nullable: true })
    deviceId: string; // デバイス識別子

    @Column({ nullable: true })
    platform: string; // プラットフォーム情報

    @Column({ nullable: true })
    appVersion: string; // アプリのバージョン情報

    @Column('jsonb', { nullable: true })
    metaData: object; // その他のメタ情報

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date; // nullの場合はセッション継続中
}
