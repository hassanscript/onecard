import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  slug: string;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  phone: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsOptional()
  profilePicUrl?: string;
}
