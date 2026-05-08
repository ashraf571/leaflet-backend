import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from './entities/facility.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) { }
  create(createFacilityDto: CreateFacilityDto) {
    return 'This action adds a new facility';
  }


  private facilityProperties(facility: Facility) {
    return {
      id: facility.facility_id,
      title: facility.name,
      area: facility.totalarea,
      numberoffloors: facility.numberoffloors,
      numberofoffices: facility.numberofoffices,
      numberofshops: facility.numberofshops,
      areaunit: facility.areaunit,
      description: facility.description,
      dimensions: facility.dimensions,
      elevations: facility.elevations,
      // stairs: facility.stairs,
      // type: facility.type,
      // areaunit: level.areaunit,
      // dimensions: level.dimensions,
      // description: level.description,
    }
  }

  private toGeoJSON(rows: any[]) {
    return {
      type: "FeatureCollection",
      name: "facility-geojson",

      features: rows.map((row) => ({
        type: "Feature",
        properties: this.facilityProperties(row),
        geometry: row.geometry,
      }))

    };
  }

  async findAll() {
    const facilites = await this.facilityRepository.query(
      `
      SELECT
        name,
        numberoffloors,
        numberofoffices,
        numberofshops,
        totalarea,
        areaunit,
        dimensions,
        elevations,
        description,
        ST_AsGeoJSON(geom)::json AS geometry
      FROM "cbd-buildings".facility;
    `
    );
    return this.toGeoJSON(facilites);
  }

  findOne(id: number) {
    return `This action returns a #${id} facility`;
  }

  update(id: number, updateFacilityDto: UpdateFacilityDto) {
    return `This action updates a #${id} facility`;
  }

  remove(id: number) {
    return `This action removes a #${id} facility`;
  }
}
