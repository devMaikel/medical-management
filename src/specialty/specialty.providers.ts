import { DataSource } from 'typeorm';
import { Specialty } from './entities/specialty.entity';

export const specialtyProviders = [
  {
    provide: 'SPECIALTY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Specialty),
    inject: ['DATA_SOURCE'],
  },
];
