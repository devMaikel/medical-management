import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  @ApiProperty()
  name: string;
}
