import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  profilePicUrl?: string;

  @IsOptional()
  customFields?: Record<string, any>;

  @IsOptional()
  templateId?: string;
}
