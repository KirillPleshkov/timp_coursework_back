import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Symptom)
    private symptomRepository: Repository<Symptom>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { name: createProductDto.categoryName },
    });

    const symptom = await this.symptomRepository.findOne({
      where: { name: createProductDto.symptomName },
    });

    if (!category || !symptom) {
      throw new HttpException(
        'Category or symptom with this name was not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const product: Omit<Product, 'id'> = {
      ...createProductDto,
      category,
      symptom,
    };

    return await this.productRepository.save(product);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
