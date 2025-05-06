import { IsOptional, IsString, MinLength } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('tytuł wiadomości'),
  })
  readonly title: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('treść wiadomości'),
  })
  readonly content: string;
}
