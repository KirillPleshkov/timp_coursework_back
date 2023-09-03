import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(search?: string) {
    if (!search) {
      return await this.categoryRepository.find();
    } else {
      return await this.categoryRepository
        .createQueryBuilder('category')
        .where(`category.name ilike '%' || :searchQuery || '%'`, {
          searchQuery: search,
        })
        .getMany();
    }
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }
}
