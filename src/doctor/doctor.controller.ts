import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import {
  badRequest,
  doctorParamQuery,
  softDelReponse,
} from '../helpers/myclasses';
import { yupValidation } from '../helpers/yupValidation';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Controller('doctor')
@ApiTags('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  yupValidator: yupValidation = new yupValidation();

  @Get()
  @ApiOperation({ summary: 'Mostrar todos os médicos cadastrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de médicos cadastrados no banco',
    type: OmitType(Doctor, ['deletedAt']),
    isArray: true,
  })
  findAll() {
    return this.doctorService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adiconar cadastro de um novo médico' })
  @ApiResponse({
    status: 201,
    description: 'Mostra médico cadastrados no banco com sucesso',
    type: Doctor,
  })
  @ApiResponse({
    status: 404,
    description: 'Mensagem informando o que está incorreto na requisição',
    type: badRequest,
  })
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorService.create(createDoctorDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pesquisar médico por ID' })
  @ApiResponse({
    status: 200,
    description: 'Mostra médico encontrado no banco com sucesso',
    type: Doctor,
  })
  @ApiResponse({
    status: 404,
    description: 'Mensagem informando que o registro não foi encontrado',
    type: badRequest,
  })
  async findOne(@Param('id') id: string) {
    const serviceResponse = await this.doctorService.findOne(+id);
    if (serviceResponse === null) {
      throw new HttpException('Doctor not founded', 404, {
        cause: new Error('Doctor not founded'),
      });
    }
    return serviceResponse;
  }

  @Get('searchby/:searchBy')
  @ApiOperation({ summary: 'Pesquisar médico por parâmetro a sua escolha' })
  @ApiResponse({
    status: 200,
    description: 'Mostra médicos encontrado no banco com sucesso',
    type: Doctor,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Mensagem informando o que está incorreto na requisição',
    type: badRequest,
  })
  async findByParam(
    @Query() query: doctorParamQuery,
    @Param('searchBy') searchBy: string,
  ) {
    return await this.doctorService.findByParam(searchBy, query.param);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Alterar dados de médico já cadastrado por ID' })
  @ApiResponse({
    status: 200,
    description: 'Mostra médico alterado no banco com sucesso',
    type: Doctor,
  })
  @ApiResponse({
    status: 404,
    description: 'Mensagem informando o que está incorreto na requisição',
    type: badRequest,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cadastro de médico (softdelete) por ID' })
  @ApiResponse({
    status: 200,
    description: 'Mostra no json o numero de linhas afetadas pela ação',
    type: softDelReponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Mensagem informando o que está incorreto na requisição',
    type: badRequest,
  })
  async softDel(@Param('id') id: string) {
    return this.doctorService.softDel(+id);
  }
}
