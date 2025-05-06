import { HttpException, HttpStatus } from '@nestjs/common';
import { COMMON_STATUS_MESSAGES } from 'src/types/statusMessages';

export const checkEmptyFields = (
  field: string | object,
  fieldName?: string,
): void => {
  if (!field) {
    throw new HttpException(
      COMMON_STATUS_MESSAGES.ERROR.emptyField(fieldName),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
};
