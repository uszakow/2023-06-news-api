import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class UserDto {
  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.emptyField('nazwa użytkownika'),
  })
  @IsString()
  readonly name: string;

  @MinLength(4, { message: COMMON_STATUS_MESSAGES.ERROR.tooShortPassword(4) })
  @IsNotEmpty({ message: COMMON_STATUS_MESSAGES.ERROR.emptyField('hasło') })
  @IsString()
  readonly password: string;
}
