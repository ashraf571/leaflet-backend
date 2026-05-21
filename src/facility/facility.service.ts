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
      price_m: facility.price_m,
      phases: facility.phases,
      sub_phase: facility.sub_phase,
      type: facility.type,
      no: facility.no,
      area: facility.area,
      far: facility.far,
      floors: facility.floors,
      area_marla: facility.area_marla,
      area_kanal: facility.area_kanal,
      area_sq_ft: facility.area_sq_ft
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
        price_m,phases,sub_phase,type,no,area, far, floors,area_marla, area_kanal, area_sq_ft,
        ST_AsGeoJSON(geom)::json AS geometry
      FROM "cbd-schema".facility;
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
