import { Doctor } from '../../../doctor/entities/doctor.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';

export const DoctorFactory = setSeederFactory(Doctor, (faker: Faker) => {
  const doctor = new Doctor();
  doctor.name = faker.name.fullName();
  doctor.cell = 84986209774;
  doctor.phone = 84986209774;
  doctor.crm = +faker.random.numeric(7);
  doctor.cep = '02040070';
  doctor.public_place = 'Rua Barra de São João';
  doctor.district = 'Jardim São Paulo(Zona Norte)';
  doctor.city = 'São Paulo';
  doctor.state = 'SP';
  doctor.specialty = [
    { id: 1, name: 'Alergologia' },
    { id: 1, name: 'Angiologia' },
  ];
  doctor.deletedAt = null;
  return doctor;
});
