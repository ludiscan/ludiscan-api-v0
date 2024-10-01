import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { PlayerSession } from './player-session.entity';

@Entity()
export class ScreenViewLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => PlayerSession, (session) => session.id, {
        nullable: false,
    })
    session: PlayerSession;

    @Column()
    screenName: string;

    @Column('jsonb', { nullable: true })
    additionalData: object; // 追加のメタデータ

    @CreateDateColumn()
    viewedAt: Date;
}
