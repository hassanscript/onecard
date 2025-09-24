import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template) private templatesRepo: Repository<Template>,
  ) {}

  async create(dto: CreateTemplateDto): Promise<Template> {
    const template = this.templatesRepo.create(dto);
    return this.templatesRepo.save(template);
  }

  async findAll(): Promise<Template[]> {
    return this.templatesRepo.find();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templatesRepo.findOne({ where: { id } });
    if (!template) throw new NotFoundException(`Template not found: ${id}`);
    return template;
  }

  async update(id: string, dto: UpdateTemplateDto): Promise<Template> {
    await this.templatesRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.templatesRepo.delete(id);
  }

  async setActive(id: string): Promise<Template> {
    // reset others
    await this.templatesRepo.update({}, { isActive: false });
    // set active
    await this.templatesRepo.update(id, { isActive: true });
    return this.findOne(id);
  }

  async getActive(): Promise<Template | null> {
    return this.templatesRepo.findOne({ where: { isActive: true } });
  }
}
