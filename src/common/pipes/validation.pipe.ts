import { Type, ValidationPipe } from '@nestjs/common';

export const GenericValidationPipe = (type: Type) => {
  return new ValidationPipe({
    expectedType: type,
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  });
};
