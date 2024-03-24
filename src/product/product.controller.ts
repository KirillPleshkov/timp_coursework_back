import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Headers() headers: Record<string, string>) {
    return this.productService.findOne(id, headers);
  }

  @Get()
  findAll(@Headers() headers: Record<string, string>) {
    return this.productService.findAll(headers);
  }
}
