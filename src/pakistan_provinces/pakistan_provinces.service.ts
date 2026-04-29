import { Injectable } from '@nestjs/common';
import { CreatePakistanProvinceDto } from './dto/create-pakistan_province.dto';
import { UpdatePakistanProvinceDto } from './dto/update-pakistan_province.dto';

import { PakistanProvince } from './entities/pakistan_province.entity';
import { PakistanBoundry } from 'src/pakistan_boundry/entities/pakistan_boundry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PakistanProvincesService {
  constructor(
    @InjectRepository(PakistanProvince)
    private readonly provinceRepo: Repository<PakistanProvince>,
    @InjectRepository(PakistanBoundry)
    private readonly PkboundryRepo: Repository<PakistanBoundry>,
  ) { }
  create(createPakistanProvinceDto: CreatePakistanProvinceDto) {
    return 'This action adds a new pakistanProvince';
  }

  private toGeoJSON(rows: any[]) {
    return {
      type: "FeatureCollection",
      features: rows.map((row) => ({
        type: "Feature",
        properties: {
          id: row.id,
          shapename: row.shapename,
        },
        geometry: row.geometry,
      })),
    };
  }

  async findAll() {
    const pkboundry = await this.PkboundryRepo
      .createQueryBuilder("p")
      .select([
        "p.id AS id",                    // Explicit alias
        "p.shapename AS shapename",      // Explicit alias
        "ST_AsGeoJSON(p.geom)::json AS geometry"
      ])
      .getRawMany();

    const provincesBound = await this.provinceRepo
      .createQueryBuilder("p")
      .select([
        "p.id AS id",                    // Explicit alias
        "p.shapename AS shapename",      // Explicit alias
        "ST_AsGeoJSON(p.geom)::json AS geometry"
      ])
      // .where("p.shapename = :name", { name: "Punjab" })
      .getRawMany();


    console.log(provincesBound[0].shapename);

    return {
      type: "FeatureCollection",
      pkboundry: this.toGeoJSON(pkboundry),
      provincesBound: this.toGeoJSON(provincesBound)
    };
  }

  async proviceMVTTiles(x: number, y: number, z: number) {

    const subQuery = this.provinceRepo
      .createQueryBuilder('p')
      .select('ST_AsMVTGeom(ST_Transform(p.geom, 3857), ST_TileEnvelope(:z, :x, :y), 4096, 256, true)', 'geom')
      .addSelect('p.id', 'id')
      .addSelect('p.shapename', 'shapename')
      .where('p.geom && ST_Transform(ST_TileEnvelope(:z, :x, :y), 4326)')
      .setParameters({ z, x, y });

    const [query, params] = subQuery.getQueryAndParameters();

    // 2. Wrap it in ST_AsMVT using a raw query execution
    // TypeORM QueryBuilder doesn't have a native .stAsMvt() method,
    // so we use the subquery's SQL inside a raw select.
    const rawResult = await this.provinceRepo.manager.query(
      `SELECT ST_AsMVT(tile.*, 'pk-provinces') AS mvt FROM (${query}) AS tile`,
      params
    );

    return rawResult[0].mvt;

    // res.setHeader("Content-Type", "application/x-protobuf");

  }



  findOne(id: number) {
    return `This action returns a #${id} pakistanProvince`;
  }

  update(id: number, updatePakistanProvinceDto: UpdatePakistanProvinceDto) {
    return `This action updates a #${id} pakistanProvince`;
  }

  remove(id: number) {
    return `This action removes a #${id} pakistanProvince`;
  }
}
