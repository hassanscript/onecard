import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Template } from '../../templates/entities/template.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  profilePicUrl: string;

  @Column({ type: 'json', nullable: true })
  customFields: Record<string, any>;

  @ManyToOne(() => Template, { nullable: true })
  @JoinColumn({ name: 'template_id' })
  template?: Template;
}
