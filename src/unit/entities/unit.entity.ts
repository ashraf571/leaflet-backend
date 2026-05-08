
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Level } from '../../level/entities/level.entity';

@Entity({ name: 'unit', schema: 'cbd-buildings' })

export class Unit {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    level_id: number;

    @ManyToOne(() => Level, (level) => level.units, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'level_id' })
    level: Level;

    @Column({
        comment: 'shop, office, stairs, etc',
    })
    type: string;

    // Multipolygon boundary
    @Column({ type: 'varchar' })
    geom!: string;

    @Column()
    title: string;

    @Column({ type: 'float', default: 0 })
    area: number;

    @Column({ default: 'sqft' })
    areaunit: string;

    @Column({ nullable: true })
    dimensions: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    numberofshops: number;

    @Column({ nullable: true })
    numberofstairs: number;

    @Column({ nullable: true })
    numberofoffices: number;

    @Column({ nullable: true })
    numberofelevators: number;

    @Column({ nullable: true })
    color: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}