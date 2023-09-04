import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { name: createProductDto.categoryName },
    });

    if (!category) {
      throw new HttpException(
        'Category with this name was not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const product: Omit<Product, 'id'> = { ...createProductDto, category };

    return await this.productRepository.save(product);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
