import { IsNotEmpty, IsString } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class CreateNewsDto {
  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('nazwa wiadomości'),
  })
  @IsString()
  readonly title: string;

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('treść wiadomości'),
  })
  @IsString()
  readonly content: string;
}
