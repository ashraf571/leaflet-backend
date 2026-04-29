import { Module } from '@nestjs/common';
import { PakistanProvincesService } from './pakistan_provinces.service';
import { PakistanProvincesController } from './pakistan_provinces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PakistanProvince } from './entities/pakistan_province.entity';
import { PakistanBoundry } from 'src/pakistan_boundry/entities/pakistan_boundry.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([
      PakistanProvince,
      PakistanBoundry, // 👈 MUST be here
    ]),
  ],
  controllers: [PakistanProvincesController],
  providers: [PakistanProvincesService],
})
export class PakistanProvincesModule {}
