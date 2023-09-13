import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private basketService: BasketService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findById(id: number, headers: Record<string, string>) {
    try {
      const user = await this.basketService.getUserByHeaders(headers);

      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: {
          products: true,
        },
      });

      const changedProduct = await Promise.all(
        category?.products.map(async (el) => {
          return {
            ...el,
            isBasket: await this.basketService.isBasket(el.id, user),
          };
        }) as readonly unknown[] | [],
      );

      return { ...category, products: changedProduct };
    } catch (e) {
      return await this.categoryRepository.findOne({
        where: { id },
        relations: {
          products: true,
        },
      });
    }
  }

  async find() {
    return await this.categoryRepository.find();
  }
}
