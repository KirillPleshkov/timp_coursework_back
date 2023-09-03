import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kir.kir@@',
      database: 'chemist-shop',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
