import { IsNotEmpty, IsString } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

interface IAuthor {
  id: string;
  name: string;
}

export class GetNewsDto {
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.emptyField('id') })
  @IsString()
  readonly id: string;

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

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('autor'),
  })
  readonly author: IAuthor;
}
