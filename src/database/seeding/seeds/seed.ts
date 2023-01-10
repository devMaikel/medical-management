import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../seeds/initialSeed';
import { DoctorFactory } from '../factories/doctor.factorie';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3002,
  username: 'root',
  password: '123456',
  database: 'doctor',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // additional config options brought by typeorm-extension
  factories: [DoctorFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
