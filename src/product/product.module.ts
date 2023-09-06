import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Symptom])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
