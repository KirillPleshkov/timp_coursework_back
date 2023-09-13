import {
  HttpException,
  HttpStatus,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import jwt_decode from 'jwt-decode';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    private userService: UserService,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  async create(
    createBasketDto: CreateBasketDto,
    headers: Record<string, string>,
  ) {
    const user = await this.getUserByHeaders(headers);
    const product = await this.productService.findOne(
      createBasketDto.productId,
    );

    if (!user || !product) {
      throw new HttpException('Неверные данные', HttpStatus.BAD_REQUEST);
    }

    const basket = await this.basketRepository.save({
      user,
      product,
      count: 1,
    });

    return basket.id;
  }

  async findAll(headers: Record<string, string>) {
    const user = await this.getUserByHeaders(headers);

    return await this.basketRepository.find({
      where: { user },
      relations: { product: true },
    });
  }

  async updateCount(
    id: number,
    updateBasketDto: UpdateBasketDto,
    headers: Record<string, string>,
  ) {
    const user = await this.getUserByHeaders(headers);

    return await this.basketRepository.update(
      { id, user },
      { count: updateBasketDto.count },
    );
  }

  async remove(id: number, headers: Record<string, string>) {
    const user = await this.getUserByHeaders(headers);

    return await this.basketRepository.delete({ user, id });
  }

  async getUserByHeaders(headers: Record<string, string>) {
    const userEmail = jwt_decode<{ id: number; email: string; name: string }>(
      headers.authorization.split(' ')[1],
    ).email;

    const user = await this.userService.getUserByEmail(userEmail);

    if (!user) {
      throw new HttpException('Неверные данные', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async isBasket(id: number, user: User) {
    const product = await this.productService.findOne(id);

    if (!user || !product) {
      throw new HttpException('Неверные данные', HttpStatus.BAD_REQUEST);
    }

    const basket = await this.basketRepository.findOne({
      where: { product, user },
    });

    return !!basket;
  }
}
