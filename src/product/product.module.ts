import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Symptom } from 'src/symptom/entities/symptom.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Symptom]),
    AuthModule,
    BasketModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
