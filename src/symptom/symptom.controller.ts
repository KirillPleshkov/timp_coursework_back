import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SymptomService } from './symptom.service';
import { CreateSymptomDto } from './dto/create-symptom.dto';

@Controller('symptom')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  create(@Body() createSymptomDto: CreateSymptomDto) {
    return this.symptomService.create(createSymptomDto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.symptomService.findById(id);
  }
}
