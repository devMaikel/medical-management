import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// mocks #######################################################
const testingDoctor = {
  name: 'testing doctor',
  crm: 1234,
  phone: 84986209774,
  cell: 84986209774,
  cep: '59062350',
  specialty: [{ id: 1 }, { id: 2 }],
};

const testingDoctorInvalidCEP = {
  name: 'testing doctor',
  crm: 12345,
  cell: 8488554433,
  cep: '590602',
  specialty: [{ id: '1' }, { id: '2' }],
};

// mocks #######################################################

describe('Application routes tests e2e', () => {
  describe('Doctor routes tests e2e', () => {
    let app: INestApplication;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('route "/doctor" (GET) (get all)', () => {
      it('route "/doctor" (GET) (get all)', async () => {
        const response = await request(app.getHttpServer())
          .get('/doctor')
          .expect(200);
        expect(typeof response.body).toBe('object');
      });
    });

    describe('route "/doctor/1" (GET) (get one by id)', () => {
      it('route "/doctor/1" (GET) (get one by id)', async () => {
        const response = await request(app.getHttpServer())
          .get('/doctor/1')
          .expect(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('crm');
        expect(response.body).toHaveProperty('id');
      });
    });

    describe('route "/doctor" (POST)', () => {
      it('create with correct data', async () => {
        const response = await request(app.getHttpServer())
          .post('/doctor')
          .send(testingDoctor)
          .expect(201);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('crm');
        expect(response.body).toHaveProperty('id');
      });

      it('create with invalid cep', async () => {
        const response = await request(app.getHttpServer())
          .post('/doctor')
          .send(testingDoctorInvalidCEP)
          .expect(400);
        expect(response.body.message).toEqual('Invalid CEP');
      });
    });

    describe('route "doctor/searchby/:searchBy" (GET) (search by param)', () => {
      it('searching by public place', async () => {
        const response = await request(app.getHttpServer())
          .get('/doctor/searchby/public_place?param=Avenida Amintas Barros')
          .expect(200);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('crm');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].public_place).toEqual('Avenida Amintas Barros');
      });
    });

    describe('route "doctor/:id" (PATCH)', () => {
      it('route "/doctor/1" (PATCH) (update a doctor)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/doctor/1')
          .send(testingDoctor)
          .expect(200);

        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('crm');
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual('testing doctor');
      });

      it('route "/doctor/1" (PATCH) (update a doctor with invalid cep)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/doctor/1')
          .send(testingDoctorInvalidCEP)
          .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('CEP inválido');
      });
    });

    describe('route "doctor/:id" (DELETE)', () => {
      // it('route "/doctor/1" (DELETE) (update a doctor)', async () => {
      //   const response = await request(app.getHttpServer())
      //     .delete('/doctor/37')
      //     .expect(200);
      //   expect(response.body).toHaveProperty('generatedMaps');
      //   expect(response.body).toHaveProperty('raw');
      //   expect(response.body).toHaveProperty('affected');
      //   expect(response.body.affected).toEqual(1);
      // });
      // faltando resetar o banco de dados para sempre ter o cadastro pra deletar nos testes
    });

    describe('Specialty routes tests e2e', () => {
      describe('route "/specialty" (GET) (get all)', () => {
        it('route "/specialty" (GET) (get all)', async () => {
          const response = await request(app.getHttpServer())
            .get('/specialty')
            .expect(200);
          expect(typeof response.body).toBe('object');
        });
      });
      describe('route "/specialty" (POST) (create)', () => {
        it('route "/specialty" (POST) (create)', async () => {
          const response = await request(app.getHttpServer())
            .post('/specialty')
            .send({
              name: 'TestingData',
            })
            .expect(201);
          expect(response.body).toHaveProperty('name');
          expect(response.body).toHaveProperty('id');
          expect(response.body.name).toEqual('TestingData');
        });
      });
    });
  });
});
