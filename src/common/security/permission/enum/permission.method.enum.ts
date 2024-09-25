export enum PermissionMethodEnum {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
export type PermissionMethodEnumType =
  | PermissionMethodEnum.POST
  | PermissionMethodEnum.GET
  | PermissionMethodEnum.PATCH
  | PermissionMethodEnum.DELETE;
