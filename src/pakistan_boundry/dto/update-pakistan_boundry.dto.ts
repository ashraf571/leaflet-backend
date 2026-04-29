import { PartialType } from '@nestjs/mapped-types';
import { CreatePakistanBoundryDto } from './create-pakistan_boundry.dto';

export class UpdatePakistanBoundryDto extends PartialType(CreatePakistanBoundryDto) {}
