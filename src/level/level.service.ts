import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/unit/entities/unit.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>
  ) { }


  private levelUnitProperties(unit: Unit) {
    return {
      id: unit.id,
      color: unit.color,
      title: unit.title,
      area: unit.area,
      areaunit: unit.areaunit,
      dimensions: unit.dimensions,
      description: unit.description,
    }
  }

  private unitToGeoJSON(units: any[]) {
    return {
      type: "FeatureCollection",
      name: "unit-geojson",

      features: units?.map((unit: any) => ({
        type: "Feature",
        properties: this.levelUnitProperties(unit),
        geometry: unit.geometry,
      })),
    };
  }

  private levelProperties(level: Level) {
    return {
      id: level.id,
      color: level.color,
      title: level.level_name,
      area: level.totalarea,
      areaunit: level.areaunit,
      dimensions: level.dimensions,
      description: level.description,
      units: this.unitToGeoJSON(level.units as Unit[])
    }
  }

  private toGeoJSON(rows: any[]) {
    return {
      type: "FeatureCollection",
      name: "level-geojson",

      features: rows.map((row) => ({
        type: "Feature",
        properties: this.levelProperties(row),
        geometry: row.geometry,
      })),


    };
  }
  async findAllFacilitiesLevels(levelNumber: number) {
    const levels = await this.levelRepository.query(
      `
    SELECT
        l.id,
        l.level,
        l.level_name,
        l.facility_id,
        l.color,
        l.totalarea,
        l.areaunit,
        l.dimensions,
        l.elevations,
        l.description,
        l.geom,

        -- Level geometry as GeoJSON
        ST_AsGeoJSON(l.geom::geometry)::json AS geometry,

        -- Units array
        COALESCE(
            jsonb_agg(
                DISTINCT jsonb_build_object(
                    'id', u.id,
                    'color', u.color,
                    'title', u.title,
                    'area', u.area,
                    'areaunit', u.areaunit,
                    'dimensions', u.dimensions,
                    'description', u.description,

                    -- Unit geometry as GeoJSON
                    'geometry',
                    CASE
                        WHEN u.geom IS NOT NULL
                        THEN ST_AsGeoJSON(u.geom::geometry)::json
                        ELSE NULL
                    END
                )
            ) FILTER (WHERE u.id IS NOT NULL),
            '[]'::jsonb
        ) AS units

    FROM "cbd-buildings".level l

    LEFT JOIN "cbd-buildings".unit u
        ON l.id = u.level_id

    WHERE l.level = $1

    GROUP BY
        l.id,
        l.level,
        l.level_name,
        l.facility_id,
        l.color,
        l.totalarea,
        l.areaunit,
        l.dimensions,
        l.elevations,
        l.description,
        l.geom
    `,
      [levelNumber],
    );

    return this.toGeoJSON(levels);
  }

  findAll() {
    return `This action returns all level`;
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
