import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from './entities/symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom])],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
