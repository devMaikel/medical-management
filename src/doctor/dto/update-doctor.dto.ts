import { PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Specialty } from 'src/specialty/entities/specialty.entity';
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

  @IsArray()
  @IsString()
  specialty: Specialty[];

  // @IsString()
  // specialty2: string;

  @IsDate()
  deletedAt: Date;
}
