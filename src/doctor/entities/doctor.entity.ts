import { ApiProperty } from '@nestjs/swagger';
import { Specialty } from '../../specialty/entities/specialty.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 120 })
  @ApiProperty()
  name: string;

  @Column({ type: 'bigint' })
  @ApiProperty()
  crm: number;

  @Column({ type: 'bigint', default: null })
  @ApiProperty()
  phone: number;

  @Column({ type: 'bigint' })
  @ApiProperty()
  cell: number;

  @Column({ default: null })
  @ApiProperty()
  cep: string;

  @Column({ default: null })
  @ApiProperty()
  public_place: string;

  @Column({ default: null })
  @ApiProperty()
  district: string;

  @Column({ default: null })
  @ApiProperty()
  city: string;

  @Column({ default: null })
  @ApiProperty()
  state: string;

  @ManyToMany(() => Specialty, { eager: true })
  @JoinTable()
  @ApiProperty({ type: Specialty, isArray: true })
  specialty: Specialty[];

  // @Column({ default: null })
  // specialty: string;

  // @Column({ default: null })
  // specialty2: string;

  @DeleteDateColumn({ default: null })
  @ApiProperty()
  deletedAt: Date;

  constructor(doctor?: Partial<Doctor>) {
    this.id = doctor?.id;
    this.name = doctor?.name;
    this.crm = doctor?.crm;
    this.phone = doctor?.phone;
    this.cell = doctor?.cell;
    this.cep = doctor?.cep;
    this.public_place = doctor?.public_place;
    this.district = doctor?.district;
    this.city = doctor?.city;
    this.state = doctor?.state;
    this.specialty = doctor?.specialty;
  }
}
