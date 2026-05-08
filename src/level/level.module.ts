import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Facility } from 'src/facility/entities/facility.entity';
import { Unit } from 'src/unit/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Facility, Unit])],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule { }
