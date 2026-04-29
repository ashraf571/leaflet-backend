import { Test, TestingModule } from '@nestjs/testing';
import { PakistanBoundryController } from './pakistan_boundry.controller';
import { PakistanBoundryService } from './pakistan_boundry.service';

describe('PakistanBoundryController', () => {
  let controller: PakistanBoundryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PakistanBoundryController],
      providers: [PakistanBoundryService],
    }).compile();

    controller = module.get<PakistanBoundryController>(PakistanBoundryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
