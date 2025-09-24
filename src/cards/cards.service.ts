import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectRepository(Card) private cardsRepo: Repository<Card>) {}

  async create(dto: CreateCardDto): Promise<Card> {
    try {
      const card = this.cardsRepo.create(dto);
      return await this.cardsRepo.save(card);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Slug already in use');
      }
      throw err;
    }
  }

  async findAll(): Promise<Card[]> {
    return this.cardsRepo.find({});
  }

  async findOne(slug: string): Promise<Card> {
    const card = await this.cardsRepo.findOne({
      where: { slug },
    });
    if (!card) throw new NotFoundException(`Card not found: ${slug}`);
    return card;
  }

  async update(id: string, dto: UpdateCardDto): Promise<Card> {
    try {
      await this.cardsRepo.update(id, dto);
      const card = await this.cardsRepo.findOne({ where: { id } });
      if (!card) throw new NotFoundException('Card not found');
      return card;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Slug already in use');
      }
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    // TODO
    // Also delete the profile pic if used
    await this.cardsRepo.delete(id);
  }
}
