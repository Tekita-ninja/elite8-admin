import type { TPaginate } from "../types/Response";

export type TPermissionItem = {
  id: number
  code: string
  name: string
  method: string
}
export type TPermissionList = {
  id: number,
  pattern: string,
  code: string,
}
export type TFormPermissionItem = {
  name: string
  method: string
}

export type TResults = {
  data: TFormPermissionItem[],
  meta: TPaginate
}
export type TRolePermissions = {
  id: number
  permission: {
    id: number
    name: string
    method: string
  }
}
export class PermissionModel {
  static paginate(response: {
    data: TPermissionItem[],
    meta: TPaginate
  }) {
    return response
  }
  static lists(lists: TPermissionList[]) {
    return lists;
  }
}