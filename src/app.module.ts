import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { SearchModule } from './search/search.module';
import { SymptomModule } from './symptom/symptom.module';
import { AssistantModule } from './assistant/assistant.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket.module';

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
    SearchModule,
    SymptomModule,
    AssistantModule,
    UserModule,
    AuthModule,
    BasketModule,
  ],
})
export class AppModule {}
