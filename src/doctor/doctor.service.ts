import { HttpException, Inject, Injectable } from '@nestjs/common';
import { cepRequest } from '../helpers/cepRequest';
import { yupValidation } from '../helpers/yupValidation';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from 'src/specialty/entities/specialty.entity';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('DOCTOR_REPOSITORY')
    private doctorRepository: Repository<Doctor>,
  ) {}

  yupValidator: yupValidation = new yupValidation();

  async create(createDoctorDto: CreateDoctorDto) {
    const cepRequester = new cepRequest();
    const doctorWithCep = await cepRequester.getAddress(createDoctorDto);
    if (typeof doctorWithCep === 'string') {
      throw new HttpException('Invalid CEP', 400, {
        cause: new Error('Invalid CEP'),
      });
    }
    const schema = await this.yupValidator.validateDoctor();
    try {
      await schema.validate(doctorWithCep);
    } catch (err) {
      throw new HttpException(err.errors, 400, {
        cause: new Error(err),
      });
    }
    if (createDoctorDto.specialty[0] === createDoctorDto.specialty[1]) {
      throw new HttpException('Specialties cannot be the same', 400, {
        cause: new Error('Specialties cannot be the same'),
      });
    }
    return await this.doctorRepository.save(createDoctorDto);
  }

  async findAll() {
    // return await this.doctorRepository.find({ where: { deletedAt: null } });
    return await this.doctorRepository.find({
      relations: { specialty: true },
      where: { deletedAt: null },
    });
  }

  async findOne(id: number) {
    // return await this.doctorRepository.findOne({
    //   relations: { specialty: true },
    //   where: { id },
    // });
    return await this.doctorRepository.findOne({
      relations: { specialty: true },
      where: { id },
    });
  }

  async findByParam(searchBy: string, param: string) {
    const validParams: string[] = [
      'id',
      'name',
      'cep',
      'public_place',
      'district',
      'city',
      'state',
      'crm',
      'phone',
      'cell',
      'specialty',
    ];
    if (validParams.includes(searchBy)) {
      if (searchBy === 'specialty') {
        return await this.doctorRepository.find({
          where: { specialty: [{ id: +param }] },
          // where: { specialty: ArrayContains([{ id: +param }]) },
          relations: { specialty: true },
        });
      }
      return await this.doctorRepository.find({
        relations: { specialty: true },
        where: { [searchBy]: param },
      });
    }
    throw new HttpException('Invalid search field', 400, {
      cause: new Error('Invalid search field'),
    });
  }

  async update(id: number, createDoctorDto: UpdateDoctorDto) {
    const cepRequester = new cepRequest();
    const doctorWithCep = await cepRequester.getAddress(createDoctorDto);
    if (typeof doctorWithCep === 'string') {
      throw new HttpException('CEP inv??lido', 400, {
        cause: new Error('CEP inv??lido'),
      });
    }
    const schema = await this.yupValidator.validateDoctor();
    try {
      await schema.validate(doctorWithCep);
    } catch (err) {
      throw new HttpException(err.errors, 400, {
        cause: new Error(err),
      });
    }
    const record = createDoctorDto as Doctor;
    record.specialty = createDoctorDto.specialty.map((id) => id as Specialty);
    record.id = id;
    return await this.create(record);
  }

  async softDel(id: number) {
    const doctorToDelete = await this.findOne(+id);
    if (!doctorToDelete || doctorToDelete.deletedAt !== null) {
      throw new HttpException('Doctor is not found', 400, {
        cause: new Error('Doctor is not found'),
      });
    }
    return await this.doctorRepository.softDelete(+id);
  }
}
