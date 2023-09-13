import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Symptom)
    private symptomRepository: Repository<Symptom>,
    private basketService: BasketService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    let category: Category | null | undefined =
      await this.categoryRepository.findOne({
        where: { name: createProductDto.categoryName },
      });

    let symptom: Symptom | null | undefined =
      await this.symptomRepository.findOne({
        where: { name: createProductDto.symptomName },
      });

    if (symptom === null) symptom = undefined;
    if (category === null) category = undefined;

    const product: Omit<Product, 'id' | 'baskets'> = {
      ...createProductDto,
      category,
      symptom,
    };

    return await this.productRepository.save(product);
  }

  async findOne(id: number, headers?: Record<string, string>) {
    try {
      if (!headers) {
        throw new HttpException(
          'Category or symptom with this name was not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.basketService.getUserByHeaders(headers);
      const product = await this.productRepository.findOne({ where: { id } });

      if (!product) {
        throw new HttpException(
          'Category or symptom with this name was not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        ...product,
        isBasket: await this.basketService.isBasket(product.id, user),
      };
    } catch (e) {
      return await this.productRepository.findOne({ where: { id } });
    }
  }
}
