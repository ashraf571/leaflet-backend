import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pakistan_provinces', schema: 'geoData' })
export class PakistanProvince {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar'})
  shapename!: string;

  @Column({ type: 'varchar'})
  shapeiso!: string;

  @Column({ type: 'varchar' })
  shapeid!: string;

  @Column({ type: 'varchar' })
  shapegroup!: string;

  @Column({ type: 'varchar' })
  shapetype!: string;


  @Column({ type: 'varchar' })
  geom!: string;
}
