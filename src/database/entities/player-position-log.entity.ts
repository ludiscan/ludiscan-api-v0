import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { PlaySession } from './play-session.entity';
import { PlayerPositionLogInterface } from '../../interface/player-position-log.interface';

@Entity('player_position_logs')
export class PlayerPositionLog implements PlayerPositionLogInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.id, { nullable: false })
    project: Project;

    @ManyToOne(() => PlaySession, (session) => session.id, {
        nullable: false,
    })
    session: PlaySession;

    @Column('float', { default: 0 })
    x: number;

    @Column('float', { default: 0 })
    y: number;

    @Column('float', { nullable: true })
    z?: number; // 3D座標対応

    @Column('integer')
    offsetTimestamp: number;

    @Column('text', { nullable: true })
    location?: string; // 座標を複合的に扱う場合の例（必要に応じてカスタム）
}
