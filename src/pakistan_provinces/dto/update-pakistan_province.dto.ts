import { PartialType } from '@nestjs/mapped-types';
import { CreatePakistanProvinceDto } from './create-pakistan_province.dto';

export class UpdatePakistanProvinceDto extends PartialType(CreatePakistanProvinceDto) {}
