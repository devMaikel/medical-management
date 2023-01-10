import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Specialty } from './entities/specialty.entity';

@Controller('specialty')
@ApiTags('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  @ApiOperation({ summary: 'Adiconar cadastro de um nova especialidade' })
  @ApiResponse({
    status: 201,
    description: 'Mostra especialidade cadastrada com sucesso',
    type: Specialty,
  })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mostrar todas especialidades cadastradas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de especialidades retornadas com sucesso',
    type: Specialty,
    isArray: true,
  })
  findAll() {
    return this.specialtyService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.specialtyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSpecialtyDto: UpdateSpecialtyDto) {
  //   return this.specialtyService.update(+id, updateSpecialtyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.specialtyService.remove(+id);
  // }
}
