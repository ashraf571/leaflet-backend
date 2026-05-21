
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Level } from '../../level/entities/level.entity';

@Entity({ name: 'facility', schema: 'cbd-schema' })

export class Facility {
    @PrimaryGeneratedColumn()
    facility_id: number;

    @Column()
    name!: string;

    @Column()
    no!: number;

    @Column()
    area!: number;


    @Column({
        type: 'varchar',
        length: 100,
    })
    type!: string;

    @Column({ type: 'varchar', default: '#000000' })
    color!: string;

    @Column({ type: 'float', nullable: true })
    price_m!: number;

    @Column({ type: 'varchar', nullable: true })
    far!: string;

    @Column({ type: 'float', nullable: true })
    floors!: number;

    @Column({ type: 'varchar', nullable: true })
    phases!: string;

    @Column({ type: 'varchar', nullable: true })
    sub_phase!: string;

    @Column({ type: 'float', nullable: true })
    area_marla!: number;

    @Column({ type: 'float', nullable: true })
    area_kanal!: number;

    @Column({ type: 'float', nullable: true })
    area_sq_ft!: number;

    @Column({ type: 'text', nullable: true })
    description!: string;

    // GeoJSON Geometry
    @Column({ type: 'varchar' })
    geom!: string;

    @OneToMany(() => Level, (level) => level.facility, {
        cascade: true,
    })
    levels!: Level[];
}