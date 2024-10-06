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
export class GeneralEventLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => PlaySession, (session) => session.id, {
        nullable: false,
    })
    session: PlaySession;

    @Column()
    eventType: string;

    @Column('jsonb')
    eventData: object;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
