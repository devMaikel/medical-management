import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { getRepositoryToken } from '@nestjs/typeorm'; // não encontrei solução pra realizar testes do service sem o getRepositoryToken (que é recomendado na documentação -> https://docs.nestjs.com/techniques/database#testing)

// mocks #######################################################
const allDoctorsMock: Doctor[] = [
  new Doctor({
    id: 1,
    name: 'fulano',
    crm: 1234567,
    cell: 84986209774,
    phone: 84986209774,
    cep: '59062300',
    city: 'Natal',
    district: 'Nossa Senhora de Nazaré',
    public_place: 'Avenida Lima e Silva',
    state: 'RN',
    specialty: 'Cardiologia clínca',
    specialty2: 'Cirurgia de tórax',
    deletedAt: null,
  }),
  new Doctor({
    id: 2,
    name: 'fulano2',
    crm: 1234567,
    cell: 84986209774,
    phone: 84986209774,
    cep: '59062300',
    city: 'Natal',
    district: 'Nossa Senhora de Nazaré',
    public_place: 'Avenida Lima e Silva',
    state: 'RN',
    specialty: 'Cardiologia clínca',
    specialty2: 'Cirurgia de tórax',
    deletedAt: null,
  }),
  new Doctor({
    id: 3,
    name: 'fulano3',
    crm: 1234567,
    cell: 84986209774,
    phone: 84986209774,
    cep: '59062300',
    city: 'Natal',
    district: 'Nossa Senhora de Nazaré',
    public_place: 'Avenida Lima e Silva',
    state: 'RN',
    specialty: 'Cardiologia clínca',
    specialty2: 'Cirurgia de tórax',
    deletedAt: null,
  }),
];

const bodyToCreateMock: CreateDoctorDto = {
  name: 'fulano',
  crm: 1234567,
  cell: 84986209774,
  phone: 84986209774,
  cep: '59062300',
  city: 'Natal',
  district: 'Nossa Senhora de Nazaré',
  public_place: 'Avenida Lima e Silva',
  state: 'RN',
  specialty: 'Cardiologia clínca',
  specialty2: 'Cirurgia de tórax',
  deletedAt: null,
};

const bodyToUpdateMock: UpdateDoctorDto = {
  name: 'fulano',
  crm: 1234567,
  cell: 84986209774,
  phone: 84986209774,
  cep: '59062300',
  city: 'Natal',
  district: 'Nossa Senhora de Nazaré',
  public_place: 'Avenida Lima e Silva',
  state: 'RN',
  specialty: 'Cardiologia clínca',
  specialty2: 'Cirurgia de tórax',
  deletedAt: null,
};

const newCreatedDoctorMock = new Doctor({
  id: 1,
  name: 'fulano',
  crm: 1234567,
  cell: 84986209774,
  phone: 84986209774,
  cep: '59062300',
  city: 'Natal',
  district: 'Nossa Senhora de Nazaré',
  public_place: 'Avenida Lima e Silva',
  state: 'RN',
  specialty: 'Cardiologia clínca',
  specialty2: 'Cirurgia de tórax',
  deletedAt: null,
});

const updateAndSoftDelReturnMock = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

// mocks #######################################################

// describe('DoctorService', () => {
//   let doctorService: DoctorService;
//   let doctorRepository: Repository<Doctor>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         DoctorService,
//         {
//           provide: getRepositoryToken(doctorRepository),
//           useValue: {
//             create: jest.fn().mockResolvedValue(newCreatedDoctorMock),
//             findAll: jest.fn().mockResolvedValue(allDoctorsMock),
//             findOne: jest.fn().mockResolvedValue(newCreatedDoctorMock),
//             findByParam: jest.fn().mockResolvedValue(newCreatedDoctorMock),
//             update: jest.fn().mockResolvedValue(updateAndSoftDelReturnMock),
//             softDel: jest.fn().mockResolvedValue(updateAndSoftDelReturnMock),
//           },
//         },
//       ],
//     }).compile();

//     doctorService = module.get<DoctorService>(DoctorService);
//     doctorRepository = module.get<Repository<Doctor>>(
//       getRepositoryToken(Doctor),
//     );
//   });

//   it('doctorController and doctorService should be defined', () => {
//     expect(doctorRepository).toBeDefined();
//     expect(doctorService).toBeDefined();
//   });
// });
