import { Controller, Get, Query } from '@nestjs/common';
import { AssistantService } from './assistant.service';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Get()
  findByQuery(@Query('symptom') symptomName?: string) {
    return this.assistantService.findByQuery(symptomName);
  }
}
