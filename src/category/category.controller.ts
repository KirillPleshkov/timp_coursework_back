import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(':id')
  findById(
    @Param('id') id: number,
    @Headers() headers: Record<string, string>,
  ) {
    return this.categoryService.findById(id, headers);
  }

  @Get()
  find() {
    return this.categoryService.find();
  }
}
