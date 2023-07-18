import { HttpException, HttpStatus } from '@nestjs/common';
import { NewsEntity } from 'src/modules/news/news.entity';
import { NEWS_STATUS_MESSAGES } from 'src/types/statusMessages';

export const checkNewsPermission = (
  news: NewsEntity,
  currentUserId: string,
): void => {
  if (!news) {
    throw new HttpException(
      NEWS_STATUS_MESSAGES.ERROR.NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  } else if (news.author?.id !== currentUserId) {
    throw new HttpException(
      NEWS_STATUS_MESSAGES.ERROR.NOT_PERMITTED,
      HttpStatus.FORBIDDEN,
    );
  }
};
