import { IsNotEmpty, IsString } from 'class-validator';
import { GetUserDto } from 'src/modules/user/dto/getUser.dto';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

interface Author {
  id: string;
  name: string;
}

export class GetNewsDto {
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('id') })
  @IsString()
  readonly id: string;

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

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('autor'),
  })
  readonly author: Author;
}
