import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { SpecialtyModule } from './specialty/specialty.module';

@Module({
  imports: [DoctorModule, SpecialtyModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
