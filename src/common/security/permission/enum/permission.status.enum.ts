export enum PermissionStatusEnum {
  PENDING = 'pending',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}
export type PermissionStatusEnumType =
  | PermissionStatusEnum.PENDING
  | PermissionStatusEnum.ENABLED
  | PermissionStatusEnum.DISABLED;
