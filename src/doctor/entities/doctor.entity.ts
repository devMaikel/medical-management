import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ type: 'bigint' })
  crm: number;

  @Column({ type: 'bigint', default: null })
  phone: number;

  @Column({ type: 'bigint' })
  cell: number;

  @Column({ default: null })
  cep: string;

  @Column({ default: null })
  public_place: string;

  @Column({ default: null })
  district: string;

  @Column({ default: null })
  city: string;

  @Column({ default: null })
  state: string;

  @Column({ default: null })
  specialty: string;

  @Column({ default: null })
  specialty2: string;

  @DeleteDateColumn({ default: null })
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
    this.specialty2 = doctor?.specialty2;
  }
}
