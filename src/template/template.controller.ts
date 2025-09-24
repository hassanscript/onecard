import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get() {
    return this.templateService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    return this.templateService.update(id, dto);
  }
}
