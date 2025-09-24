import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectRepository(Card) private cardsRepo: Repository<Card>) {}

  async create(dto: CreateCardDto): Promise<Card> {
    const card = this.cardsRepo.create(dto);
    return this.cardsRepo.save(card);
  }

  async findAll(): Promise<Card[]> {
    return this.cardsRepo.find({ relations: ['template'] });
  }

  async findOne(slug: string): Promise<Card> {
    const card = await this.cardsRepo.findOne({
      where: { slug },
      relations: ['template'],
    });
    if (!card) throw new NotFoundException(`Card not found: ${slug}`);
    return card;
  }

  async update(id: string, dto: UpdateCardDto): Promise<Card | null> {
    await this.cardsRepo.update(id, dto);
    const card = this.cardsRepo.findOne({ where: { id } });
    return card;
  }

  async remove(id: string): Promise<void> {
    await this.cardsRepo.delete(id);
  }
}
