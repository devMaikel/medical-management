import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;
}
