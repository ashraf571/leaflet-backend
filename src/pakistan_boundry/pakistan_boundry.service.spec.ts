import { Test, TestingModule } from '@nestjs/testing';
import { PakistanBoundryService } from './pakistan_boundry.service';

describe('PakistanBoundryService', () => {
  let service: PakistanBoundryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PakistanBoundryService],
    }).compile();

    service = module.get<PakistanBoundryService>(PakistanBoundryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
