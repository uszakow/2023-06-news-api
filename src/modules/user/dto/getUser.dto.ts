import { IsNotEmpty, IsString } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

interface INews {
  id: string;
  title: string;
}

export class GetUserDto {
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.emptyField('id') })
  @IsString()
  readonly id: string;

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('nazwa użytkownika'),
  })
  @IsString()
  readonly name: string;

  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('news'),
  })
  readonly news: INews[];
}
