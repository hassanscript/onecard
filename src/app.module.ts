import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/entities/card.entity';
import { TemplatesModule } from './templates/templates.module';
import { Template } from './templates/entities/template.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [User, Card, Template],
    }),
    UsersModule,
    AuthModule,
    CardsModule,
    TemplatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
