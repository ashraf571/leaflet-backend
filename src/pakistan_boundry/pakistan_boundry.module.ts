import { Module } from '@nestjs/common';
import { PakistanBoundryService } from './pakistan_boundry.service';
import { PakistanBoundryController } from './pakistan_boundry.controller';

@Module({
  controllers: [PakistanBoundryController],
  providers: [PakistanBoundryService],
})
export class PakistanBoundryModule {}
