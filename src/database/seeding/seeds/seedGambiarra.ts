import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';
import { faker, Faker } from '@faker-js/faker';

export class testGambiarra {
  specialtysData = [
    'Alergologia',
    'Angiologia',
    'Buco maxilo',
    'Cardiologia clínca',
    'Cardiologia infantil',
    'Cirurgia cabeça e pescoço',
    'Cirurgia cardíaca',
    'Cirurgia de tórax',
  ];

  async runSeeds() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication() as INestApplication;
    faker: Faker;

    await app.init();

    const response = await request(app.getHttpServer()).get('/specialty');
    if (response.body[0] == undefined) {
      console.log('Adicionando dados a tabela specialty . . .');
      // this.specialtysData.forEach(async (e, index) => {
      //   await request(app.getHttpServer()).post('/specialty').send({ name: e });
      //   await console.log(`${index}0% Concluído . . .`);
      // });
      for (let index = 0; index < 8; index += 1) {
        await request(app.getHttpServer())
          .post('/specialty')
          .send({ name: this.specialtysData[index] });
        await console.log(`${index}0% Concluído . . .`);
      }
    } else {
      console.log('Tabela incompatível. Favor reiniciar o banco de dados!');
      return 0;
    }
    console.log('Specialty OK!');
    console.log('Adicionando dados a tabela doctor . . .');
    for (let count = 0; count < 10; count += 1) {
      await request(app.getHttpServer())
        .post('/doctor')
        .send({
          name: faker.name.fullName(),
          crm: +faker.random.numeric(7),
          phone: 84986209774,
          cell: 84986209774,
          cep: '02040070',
          specialty: [{ id: 1 }, { id: 2 }],
        });
      await console.log(`Doctor ${count}0% concluído . . .`);
    }
    console.log('Doctor OK!');
    console.log('Tabelas povoadas com sucesso!');
  }
}

const seed = new testGambiarra();

seed.runSeeds();
