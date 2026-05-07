
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Level } from '../../level/entities/level.entity';

@Entity('facilities')
export class Facility {
    @PrimaryGeneratedColumn()
    facility_id: number;

    @Column()
    name: string;

    @Column({ type: 'int', default: 0 })
    numberoffloors: number;

    @Column({ type: 'int', default: 0 })
    numberofoffices: number;

    @Column({ type: 'int', default: 0 })
    numberofshops: number;

    @Column({ type: 'float', default: 0 })
    totalarea: number;

    @Column({ default: 'sqft' })
    areaunit: string;

    @Column({ type: 'int', default: 0 })
    stairs: number;

    @Column({
        type: 'varchar',
        length: 100,
        comment: 'commercial, residential, etc',
    })
    type: string;

    @Column({ type: 'int', default: 0 })
    elevators: number;

    @Column({ nullable: true })
    dimensions: string;

    @Column({ nullable: true })
    elevations: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    // GeoJSON Geometry
    @Column({ type: 'varchar' })
    geom!: string;

    @OneToMany(() => Level, (level) => level.facility, {
        cascade: true,
    })
    levels: Level[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}