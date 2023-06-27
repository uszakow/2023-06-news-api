import { HttpException, HttpStatus } from '@nestjs/common';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export const checkEmptyFields = (field: any, fieldName?: string): void => {
  if (!field) {
    throw new HttpException(
      COMMON_STATUS_MESSAGES.ERROR.EMPTY_FIELD(fieldName),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
};
