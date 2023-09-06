import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(Symptom) private symptomRepository: Repository<Symptom>,
  ) {}

  async findByQuery(symptomName?: string) {
    return await this.symptomRepository.findOne({
      where: { name: symptomName },
      select: { id: true },
    });
  }
}
