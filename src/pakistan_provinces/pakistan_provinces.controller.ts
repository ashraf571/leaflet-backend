import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';

import { PakistanProvincesService } from './pakistan_provinces.service';

@Controller('pakistan-provinces')
export class PakistanProvincesController {
  constructor(private readonly pakistanProvincesService: PakistanProvincesService) { }

  @Get('mvt/:z/:x/:y.pbf')
  async proviceMVTTiles(
    @Param('z', ParseIntPipe) z: number, 
    @Param('x', ParseIntPipe) x: number, 
    @Param('y', ParseIntPipe) y: number, 
    @Res() res: Response
  ) {

    console.log('MVT : ', z, x, y);

    const result = await this.pakistanProvincesService.proviceMVTTiles(z, x, y);

    console.log('MVT Result:', result);

    res.setHeader('Content-Type', 'application/x-protobuf');
    res.send(result);
  }
  @Get()
  findAll() {
    return this.pakistanProvincesService.findAll();
  }




}
