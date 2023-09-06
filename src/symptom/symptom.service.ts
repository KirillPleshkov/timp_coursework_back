import { Injectable } from '@nestjs/common';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Symptom } from './entities/symptom.entity';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom) private symptomRepository: Repository<Symptom>,
  ) {}

  async create(createSymptomDto: CreateSymptomDto) {
    return await this.symptomRepository.save(createSymptomDto);
  }

  async findById(id: number) {
    return (
      await this.symptomRepository.findOne({
        where: { id },
        relations: {
          products: true,
        },
      })
    )?.products;
  }
}
