import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class UserDto {
  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('nazwa użytkownika'),
  })
  @IsString()
  readonly name: string;

  @MinLength(4, { message: COMMON_STATUS_MESSAGES.ERROR.TOO_SHORT_PASSWORD(4) })
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('hasło') })
  @IsString()
  readonly password: string;
}
