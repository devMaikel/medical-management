import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
// import { CreateSpecialtyDto } from './dto/create-specialty.dto';
// import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    @Inject('SPECIALTY_REPOSITORY')
    private specialtyRepository: Repository<Specialty>,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyRepository.save(createSpecialtyDto);
  }

  async findAll() {
    return this.specialtyRepository.find();
  }

  // async findById(id: number) {
  //   return await this.specialtyRepository.findOne({ where: { id } });
  // }

  // async findByName(name: string) {
  //   return await this.specialtyRepository.findOne({ where: { name } });
  // }

  // update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
  //   return `This action updates a #${id} specialty`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} specialty`;
  // }
}
