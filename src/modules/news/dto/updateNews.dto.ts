import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;
}
