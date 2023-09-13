import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createBasketDto: CreateBasketDto,
    @Headers() headers: Record<string, string>,
  ) {
    return this.basketService.create(createBasketDto, headers);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Headers() headers: Record<string, string>) {
    return this.basketService.findAll(headers);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCount(
    @Param('id') id: number,
    @Body() updateBasketDto: UpdateBasketDto,
    @Headers() headers: Record<string, string>,
  ) {
    return this.basketService.updateCount(id, updateBasketDto, headers);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Headers() headers: Record<string, string>) {
    return this.basketService.remove(id, headers);
  }
}
