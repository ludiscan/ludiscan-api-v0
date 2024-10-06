import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';
import { PlaySession } from './play-session.entity';

@Entity()
export class ScreenViewLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => PlaySession, (session) => session.id, {
        nullable: false,
    })
    session: PlaySession;

    @Column()
    screenName: string;

    @Column('jsonb', { nullable: true })
    additionalData: object; // 追加のメタデータ

    @CreateDateColumn()
    viewedAt: Date;
}
