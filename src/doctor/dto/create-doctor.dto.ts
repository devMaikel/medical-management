import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { Specialty } from '../../specialty/entities/specialty.entity';

export class CreateDoctorDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  crm: number;

  @IsNumber()
  @ApiProperty()
  @ApiPropertyOptional()
  phone: number;

  @IsNumber()
  @ApiProperty()
  cell: number;

  @IsString()
  @ApiProperty()
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
  @IsObject()
  @ApiProperty({ type: Specialty, isArray: true })
  specialty: Specialty[];

  @IsDate()
  deletedAt: Date;
}
