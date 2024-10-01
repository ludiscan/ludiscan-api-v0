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
export class GeneralEventLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => PlayerSession, (session) => session.id, {
        nullable: false,
    })
    session: PlayerSession;

    @Column()
    eventType: string;

    @Column('jsonb')
    eventData: object;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
