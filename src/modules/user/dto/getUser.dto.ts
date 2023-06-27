import { IsNotEmpty, IsString } from 'class-validator';
import { GetNewsDto } from 'src/modules/news/dto/getNews.dto';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

interface News {
  id: string;
  title: string;
}

export class GetUserDto {
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('id') })
  @IsString()
  readonly id: string;

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('nazwa użytkownika'),
  })
  @IsString()
  readonly name: string;

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('news'),
  })
  readonly news: News[];
}
