import { SetMetadata } from '@nestjs/common';

export const NoPermissionNeededKey = 'NoPermissionNeeded';
export const NoPermission = (...args: string[]) =>
  SetMetadata(NoPermissionNeededKey, args);
