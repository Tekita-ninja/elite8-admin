import AuthService from "@/app/services/AuthService";
import { defineStore } from "pinia";
import type { TLogin } from "@/app/types/Auth";
import PermissionService from "../services/PermissionService";
type PermissionAllowed = {
  id: number,
  name: string,
  pattern: string,
  method: string,
  status: boolean
}
export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    authenticated: false,
    role: <string>{},
    loading: false,
    permissions: <any>{},
    permissionGroup: <any>{},
    permissionAlloweds: <{
      header: string,
      group: PermissionAllowed[]
    }[]>[]
  }),
  actions: {
    async loginUser(dataValue: TLogin) {
      try {
        this.loading = true;
        const result = await AuthService.login(dataValue);
        if (result) {
          this.authenticated = true;
        }
      } catch (error: any) {
        return error.response?.data;
      } finally {
        this.loading = false;
      }
    },
    async logoutUser() {
      const access_token = useCookie("access_token");
      const refresh_token = useCookie("refresh_token");
      this.authenticated = false;
      access_token.value = null;
      refresh_token.value = null;
      localStorage.removeItem("permissions");
      localStorage.removeItem("permissionGroups");
      localStorage.removeItem("user");
      window.location.reload()
    },
    getAuthPermission() {
      const response = PermissionService.getMyPermission()
      this.permissions = response;
    },
    getAuthPermissionGroup() {
      const response = PermissionService.getMyPermissionGroup()
      this.permissionGroup = response;
    },
    async getPermissionAllowed() {
      this.getAuthPermission()
      const permissionLists = await PermissionService.getLists()
      const permissionFromLocal = this.permissions;
      const listAllowed = permissionLists.map((item: any) => {
        return {
          id: item.id,
          pattern: item.pattern,
          name: item.pattern.split('.').shift(),
          method: item.pattern.split('.').pop(),
          status: permissionFromLocal.includes(item.pattern),
        }
      })

      const prefixAllowed = listAllowed.map((item: PermissionAllowed) => {
        return item.name.split('/')[1]
      })

      const uniquePrefixNames = [...new Set(prefixAllowed)];
      const listAllowedGrouped = uniquePrefixNames.map((item: any) => {
        const xGroup =  listAllowed.filter((i: PermissionAllowed) => {
          return i.name.split('/')[1] == item
        })
        return {
          header: item as string,
          group: xGroup as PermissionAllowed[]
        }
      })
      this.permissionAlloweds = listAllowedGrouped
    },
    getOwnRole() {
      const user = JSON.parse(localStorage.getItem('c_user') || '');
      this.role = user?.role
    }
  }
});