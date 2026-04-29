import { Injectable } from '@nestjs/common';
import { CreatePakistanBoundryDto } from './dto/create-pakistan_boundry.dto';
import { UpdatePakistanBoundryDto } from './dto/update-pakistan_boundry.dto';

@Injectable()
export class PakistanBoundryService {
  create(createPakistanBoundryDto: CreatePakistanBoundryDto) {
    return 'This action adds a new pakistanBoundry';
  }

  findAll() {
    return `This action returns all pakistanBoundry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pakistanBoundry`;
  }

  update(id: number, updatePakistanBoundryDto: UpdatePakistanBoundryDto) {
    return `This action updates a #${id} pakistanBoundry`;
  }

  remove(id: number) {
    return `This action removes a #${id} pakistanBoundry`;
  }
}
