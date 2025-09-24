import { Injectable, NotFoundException } from '@nestjs/common';
import { Liquid } from 'liquidjs';
import { CardsService } from '../cards/cards.service';
import { TemplateService } from 'src/template/template.service';

@Injectable()
export class RenderService {
  private engine: Liquid;

  constructor(
    private readonly cardsService: CardsService,
    private readonly templateService: TemplateService,
  ) {
    this.engine = new Liquid();
  }

  async renderCard(slug: string): Promise<string> {
    const card = await this.cardsService.findOne(slug);
    const template = await this.templateService.get();

    if (!card) throw new NotFoundException(`Card not found: ${slug}`);

    const context = {
      ...card,
      custom_fields: card.customFields || {},
    };

    const renderedHtml = await this.engine.parseAndRender(template, context);

    return renderedHtml;
  }
}
