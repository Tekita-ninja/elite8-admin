import type { TPaginate } from "../types/Response";

export type TPermissionItem = {
  id: number
  name: string
  method: string
}
export type TPermission = {
  id: number
  permission: TPermissionItem
}
export type TFormRole = {
  name: string
}
export type TRole = {
  id: number
  name: string
  permissions: TPermission[]
}

export type TResults = {
  data: TRole[],
  meta: TPaginate
}

export class RoleModel {
  static paginate(response: {
    data: TRole[],
    meta: TPaginate
  }) {
    return response
  }
}