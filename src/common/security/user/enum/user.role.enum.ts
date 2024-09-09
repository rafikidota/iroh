export enum UserRoleEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
  OTHERS = 'others',
}
export type UserRoleEnumType =
  | UserRoleEnum.ADMIN
  | UserRoleEnum.CLIENT
  | UserRoleEnum.OTHERS;
