import { IsNotEmpty, IsString } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class CreateNewsDto {
  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('tytuł wiadomości'),
  })
  @IsString()
  readonly title: string;

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('treść wiadomości'),
  })
  @IsString()
  readonly content: string;
}
