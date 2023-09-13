import { Injectable } from '@nestjs/common';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Symptom } from './entities/symptom.entity';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class SymptomService {
  constructor(
    @InjectRepository(Symptom) private symptomRepository: Repository<Symptom>,
    private basketService: BasketService,
  ) {}

  async create(createSymptomDto: CreateSymptomDto) {
    return await this.symptomRepository.save(createSymptomDto);
  }

  async findById(id: number, headers: Record<string, string>) {
    try {
      const user = await this.basketService.getUserByHeaders(headers);

      const symptom = await this.symptomRepository.findOne({
        where: { id },
        relations: {
          products: true,
        },
      });

      const changedProduct = await Promise.all(
        symptom?.products.map(async (el) => {
          return {
            ...el,
            isBasket: await this.basketService.isBasket(el.id, user),
          };
        }) as readonly unknown[] | [],
      );

      return { ...symptom, products: changedProduct };
    } catch (e) {
      return await this.symptomRepository.findOne({
        where: { id },
        relations: {
          products: true,
        },
      });
    }
  }
}
