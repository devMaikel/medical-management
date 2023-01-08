import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsString()
  name: string;

  @IsNumber()
  crm: number;

  @IsNumber()
  phone: number;

  @IsNumber()
  cell: number;

  @IsString()
  cep: string;

  @IsString()
  public_place: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  specialty: string;

  @IsString()
  specialty2: string;

  @IsDate()
  deletedAt: Date;
}
