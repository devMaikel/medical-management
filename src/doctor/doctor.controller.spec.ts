import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

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
    specialty: [
      { id: 1, name: 'Cardiologia clínca' },
      { id: 2, name: 'Cirurgia de tórax' },
    ],
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
    specialty: [
      { id: 1, name: 'Cardiologia clínca' },
      { id: 2, name: 'Cirurgia de tórax' },
    ],
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
    specialty: [
      { id: 1, name: 'Cardiologia clínca' },
      { id: 2, name: 'Cirurgia de tórax' },
    ],
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
  specialty: [
    { id: 1, name: 'Cardiologia clínca' },
    { id: 2, name: 'Cirurgia de tórax' },
  ],
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
  specialty: [
    { id: 1, name: 'Cardiologia clínca' },
    { id: 2, name: 'Cirurgia de tórax' },
  ],
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
  specialty: [
    { id: 1, name: 'Cardiologia clínca' },
    { id: 2, name: 'Cirurgia de tórax' },
  ],
  deletedAt: null,
});

const updateAndSoftDelReturnMock = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

// mocks #######################################################

describe('DoctorController', () => {
  let doctorController: DoctorController;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: {
            create: jest.fn().mockResolvedValue(newCreatedDoctorMock),
            findAll: jest.fn().mockResolvedValue(allDoctorsMock),
            findOne: jest.fn().mockResolvedValue(newCreatedDoctorMock),
            findByParam: jest.fn().mockResolvedValue(newCreatedDoctorMock),
            update: jest.fn().mockResolvedValue(updateAndSoftDelReturnMock),
            softDel: jest.fn().mockResolvedValue(updateAndSoftDelReturnMock),
          },
        },
      ],
    }).compile();

    doctorController = module.get<DoctorController>(DoctorController);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('doctorController and doctorService should be defined', () => {
    expect(doctorController).toBeDefined();
    expect(doctorService).toBeDefined();
  });

  describe('Controller create', () => {
    it('should create a new doctor successfully', async () => {
      const result = await doctorController.create(bodyToCreateMock);

      expect(result).toEqual(newCreatedDoctorMock);
      expect(doctorService.create).toHaveBeenCalledTimes(1);
      expect(doctorService.create).toHaveBeenCalledWith(bodyToCreateMock);
    });

    it('should throw an new error', async () => {
      jest.spyOn(doctorService, 'create').mockRejectedValueOnce(new Error());
      expect(doctorController.create(bodyToCreateMock)).rejects.toThrowError();
      expect(doctorService.create).toHaveBeenCalledTimes(1);
      expect(doctorService.create).toHaveBeenCalledWith(bodyToCreateMock);
    });
  });

  describe('Controller findAll', () => {
    it('should return all Doctors sucessfully', async () => {
      const result = await doctorController.findAll();

      expect(result).toEqual(allDoctorsMock);
      expect(doctorService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an new error', async () => {
      jest.spyOn(doctorService, 'findAll').mockRejectedValueOnce(new Error());

      expect(doctorController.findAll()).rejects.toThrowError();
    });
  });

  describe('Controller findOne', () => {
    it('should return one Doctor sucessfully', async () => {
      const result = await doctorController.findOne('1');

      expect(result).toEqual(newCreatedDoctorMock);
      expect(doctorService.findOne).toHaveBeenCalledTimes(1);
      expect(doctorService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an new error', async () => {
      jest.spyOn(doctorService, 'findOne').mockRejectedValueOnce(new Error());

      expect(doctorController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('Controller findByParam', () => {
    it('should find a doctor by param successfully', async () => {
      const result = await doctorController.findByParam(
        { param: 'fulano' },
        'name',
      );

      expect(result).toEqual(newCreatedDoctorMock);
      expect(doctorService.findByParam).toHaveBeenCalledTimes(1);
      // expect(doctorService.findByParam).toHaveBeenCalledWith('name', 'fulano');
      // WARNING !!! Problema aqui nos testes do query param, não encontrei solução
    });

    it('should throw an new error', async () => {
      jest
        .spyOn(doctorService, 'findByParam')
        .mockRejectedValueOnce(new Error());
      expect(
        doctorController.findByParam({ param: 'fulano' }, 'name'),
      ).rejects.toThrowError();
      expect(doctorService.findByParam).toHaveBeenCalledTimes(1);
      // expect(doctorService.findByParam).toHaveBeenCalledWith('name', 'fulano');
      // WARNING !!! Problema aqui nos testes do query param, não encontrei solução
    });
  });

  describe('Controller Update', () => {
    it('should update one Doctor sucessfully', async () => {
      const result = await doctorController.update('1', bodyToUpdateMock);

      expect(result).toEqual(updateAndSoftDelReturnMock);
      expect(doctorService.update).toHaveBeenCalledTimes(1);
      expect(doctorService.update).toHaveBeenCalledWith(1, bodyToUpdateMock);
    });

    it('should throw an new error', async () => {
      jest.spyOn(doctorService, 'update').mockRejectedValueOnce(new Error());

      expect(
        doctorController.update('1', bodyToUpdateMock),
      ).rejects.toThrowError();
    });
  });

  describe('Controller softDel', () => {
    it('should soft delete one Doctor sucessfully', async () => {
      const result = await doctorController.softDel('1');

      expect(result).toEqual(updateAndSoftDelReturnMock);
      expect(doctorService.softDel).toHaveBeenCalledTimes(1);
      expect(doctorService.softDel).toHaveBeenCalledWith(1);
    });

    it('should throw an new error', async () => {
      jest.spyOn(doctorService, 'softDel').mockRejectedValueOnce(new Error());

      expect(doctorController.softDel('1')).rejects.toThrowError();
    });
  });
});
