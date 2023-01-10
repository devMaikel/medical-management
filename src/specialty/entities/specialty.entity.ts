import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 30, default: null })
  @ApiProperty()
  name: string;
}
