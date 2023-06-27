import { IsNotEmpty, IsString } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class UserTokenDto {
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('token') })
  @IsString()
  token: string;
}
