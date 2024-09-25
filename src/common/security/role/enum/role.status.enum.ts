export enum RoleStatusEnum {
  PENDING = 'pending',
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}
export type RoleStatusEnumType =
  | RoleStatusEnum.PENDING
  | RoleStatusEnum.ENABLED
  | RoleStatusEnum.DISABLED;
