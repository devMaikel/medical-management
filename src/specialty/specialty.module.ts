import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { DatabaseModule } from 'src/database/database.module';
import { specialtyProviders } from './specialty.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecialtyController],
  providers: [...specialtyProviders, SpecialtyService],
})
export class SpecialtyModule {}
