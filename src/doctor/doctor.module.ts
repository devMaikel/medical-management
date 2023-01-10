import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { DatabaseModule } from '../database/database.module';
import { doctorProviders } from './doctor.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [DoctorController],
  providers: [...doctorProviders, DoctorService],
})
export class DoctorModule {}
