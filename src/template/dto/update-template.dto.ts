import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsOptional()
  @IsString()
  css?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
