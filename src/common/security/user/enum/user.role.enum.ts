export enum UserTypeEnum {
  ADMIN = 'admin',
  CLIENT = 'client',
  OTHERS = 'others',
}
export type UserRoleEnumType =
  | UserTypeEnum.ADMIN
  | UserTypeEnum.CLIENT
  | UserTypeEnum.OTHERS;
