import type { TPermissionList, TRolePermissions } from "@/app/models/PermissionModel"
export type TGroupCheck = {
  id: number
  name: string
  method: string
  code: string
  status: boolean
}
export type groupedPermissions = {
  title: string
  status: boolean
  group: TGroupCheck[]
}
export const toAllowedPermissionRoles = (
  permissionList: TPermissionList[],
  rolePermissions: TRolePermissions[]
) => {

  const permissionIds = rolePermissions.map(item => item.permission.id);
  const mergedPermissionLists = permissionList.map(item => {
    return {
      id: item.id,
      name: item.pattern.split('.').shift(),
      method: item.pattern.split('.').pop(),
      code: item.code,
      status: permissionIds.includes(item.id)
    };
  })
  const prefixNames = mergedPermissionLists.map(item => item.name?.split('/')[1])
  const uniquePrefixNames = [...new Set(prefixNames)] as string[];
  const groupepPermissions = uniquePrefixNames.map((item: string) => {
    const group = mergedPermissionLists.filter(i => {
      return i.name?.split('/')[1] == item
    })
    return {
      title: item as string,
      status: group.filter(i => i.status === true).length > 0,
      group
    }
  })
  return groupepPermissions as groupedPermissions[];
}