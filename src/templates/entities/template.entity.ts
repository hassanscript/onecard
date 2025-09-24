import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Card } from '../../cards/entities/card.entity';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  html: string; // Liquid/Handlebars template

  @Column({ type: 'text', nullable: true })
  css: string; // Raw CSS

  @Column({ default: false })
  isActive: boolean; // Is this the default template?

  @OneToMany(() => Card, (card) => card.template)
  cards: Card[];
}
