export enum MethodPermissionEnum {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
export type MethodPermissionType =
  | MethodPermissionEnum.POST
  | MethodPermissionEnum.GET
  | MethodPermissionEnum.PATCH
  | MethodPermissionEnum.DELETE;
