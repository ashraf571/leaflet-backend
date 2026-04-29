import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PakistanBoundryService } from './pakistan_boundry.service';
import { CreatePakistanBoundryDto } from './dto/create-pakistan_boundry.dto';
import { UpdatePakistanBoundryDto } from './dto/update-pakistan_boundry.dto';

@Controller('pakistan-boundry')
export class PakistanBoundryController {
  constructor(private readonly pakistanBoundryService: PakistanBoundryService) {}

  @Post()
  create(@Body() createPakistanBoundryDto: CreatePakistanBoundryDto) {
    return this.pakistanBoundryService.create(createPakistanBoundryDto);
  }

  @Get()
  findAll() {
    return this.pakistanBoundryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pakistanBoundryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePakistanBoundryDto: UpdatePakistanBoundryDto) {
    return this.pakistanBoundryService.update(+id, updatePakistanBoundryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pakistanBoundryService.remove(+id);
  }
}
