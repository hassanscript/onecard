import { Module } from '@nestjs/common';
import { RenderService } from './render.service';
import { RenderController } from './render.controller';
import { CardsModule } from '../cards/cards.module';
import { TemplateModule } from '../template/template.module';

@Module({
  imports: [CardsModule, TemplateModule],
  providers: [RenderService],
  controllers: [RenderController],
})
export class RenderModule {}
