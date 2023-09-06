import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AssistantController } from './assistant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symptom } from 'src/symptom/entities/symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Symptom])],
  controllers: [AssistantController],
  providers: [AssistantService],
})
export class AssistantModule {}
