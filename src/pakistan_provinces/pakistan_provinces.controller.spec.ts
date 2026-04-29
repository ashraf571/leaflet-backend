import { Test, TestingModule } from '@nestjs/testing';
import { PakistanProvincesController } from './pakistan_provinces.controller';
import { PakistanProvincesService } from './pakistan_provinces.service';

describe('PakistanProvincesController', () => {
  let controller: PakistanProvincesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PakistanProvincesController],
      providers: [PakistanProvincesService],
    }).compile();

    controller = module.get<PakistanProvincesController>(PakistanProvincesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
