import { SetMetadata } from '@nestjs/common';

export const NoPermissionNeededKey = 'NoPermissionNeeded';
export const NoPermission = () => SetMetadata(NoPermissionNeededKey, true);
