// src/render/render.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { RenderService } from './render.service';
import { Response } from 'express';

@Controller('cards')
export class RenderController {
  constructor(private readonly renderService: RenderService) {}

  @Get(':slug/render')
  async render(@Param('slug') slug: string, @Res() res: Response) {
    const html = await this.renderService.renderCard(slug);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
}
