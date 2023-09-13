import { Module } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { SymptomController } from './symptom.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from './entities/symptom.entity';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom]), BasketModule],
  controllers: [SymptomController],
  providers: [SymptomService],
})
export class SymptomModule {}
