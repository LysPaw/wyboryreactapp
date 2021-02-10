import { FieldError } from '../generated/graphql';

export const toErrorMap = (errorResponse: FieldError[]) => {
  const errorObj: Record<string, string> = {};

  errorResponse.forEach(({ field, message }) => {
    errorObj[field] = message;
  });

  return errorObj;
};
