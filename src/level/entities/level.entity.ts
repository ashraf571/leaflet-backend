
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Facility } from '../../facility/entities/facility.entity';
import { Unit } from '../../unit/entities/unit.entity';

@Entity('levels')
export class Level {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    facility_ref_id: string;

    @ManyToOne(() => Facility, (facility) => facility.levels, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'facility_ref_id' })
    facility: Facility;

    @Column()
    level_name: string;

    // MultiPolygon floor footprint
    @Column({ type: 'varchar' })
    geom!: string;


    @Column({ type: 'int' })
    level_number: number;

    @Column({ nullable: true })
    color: string;

    @OneToMany(() => Unit, (unit) => unit.level, {
        cascade: true,
    })
    units: Unit[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}