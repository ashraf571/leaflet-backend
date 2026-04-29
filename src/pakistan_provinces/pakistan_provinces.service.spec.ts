import { Test, TestingModule } from '@nestjs/testing';
import { PakistanProvincesService } from './pakistan_provinces.service';

describe('PakistanProvincesService', () => {
  let service: PakistanProvincesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PakistanProvincesService],
    }).compile();

    service = module.get<PakistanProvincesService>(PakistanProvincesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
