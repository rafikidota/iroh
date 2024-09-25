export enum UserStatusEnum {
  PENDING = 'pending',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}
export type UserStatusEnumType =
  | UserStatusEnum.PENDING
  | UserStatusEnum.ENABLED
  | UserStatusEnum.DISABLED;
