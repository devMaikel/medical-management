import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Doctor } from '../../../doctor/entities/doctor.entity';
// import { Specialty } from '../../../specialty/entities/specialty.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const doctorRepository = dataSource.getRepository(Doctor);
    // const specialtyRepository = dataSource.getRepository(Specialty);

    const doctorFactory = factoryManager.get(Doctor);
    // const specialtyFactory = factoryManager.get(Specialty);

    const doctors = await doctorFactory.saveMany(7);
    console.log(doctors);
    console.log('um console log aqui!');

    await doctorRepository.save(doctors);

    // await postsRepository.save(posts);
  }
}
