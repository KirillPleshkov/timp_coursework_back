import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findByQuery(search?: string) {
    const products = await this.findInRepository(
      this.productRepository,
      search,
    );
    const categories = await this.findInRepository(
      this.categoryRepository,
      search,
    );

    return { products, categories };
  }

  async findInRepository<T extends Repository<ObjectLiteral>>(
    repository: T,
    search?: string,
  ) {
    if (!search) {
      return await repository.find();
    } else {
      return await repository
        .createQueryBuilder('table')
        .select(['table.id', 'table.name'])
        .where(`table.name ilike '%' || :searchQuery || '%'`, {
          searchQuery: search,
        })
        .getMany();
    }
  }
}
