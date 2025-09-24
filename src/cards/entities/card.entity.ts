import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
