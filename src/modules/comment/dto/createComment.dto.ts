import { IsNotEmpty, IsString } from 'class-validator';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export class CreateCommentDto {
  @IsNotEmpty({
    message: COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD('treść wiadomości'),
  })
  @IsString()
  readonly content: string;
}
