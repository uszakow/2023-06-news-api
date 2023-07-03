import { IsOptional, IsString, MinLength } from 'class-validator';
import {
  COMMON_STATUS_MESSAGES,
  USER_STATUS_MESSAGES,
} from 'src/types/statusMessages';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: USER_STATUS_MESSAGES.ERROR.EMPTY_NAME })
  readonly name: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: COMMON_STATUS_MESSAGES.ERROR.TOO_SHORT_PASSWORD(4) })
  readonly password: string;
}
