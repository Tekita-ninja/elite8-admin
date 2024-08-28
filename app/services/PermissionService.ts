import type { TFormPermissionItem } from "../models/PermissionModel";
import type { TQueryParams } from "../types/Common";

class PermissionService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `permissions`,
      method: "GET",
      params
    });
    return response.data;
  }
  async create(data: TFormPermissionItem) {
    const response = await this.api({
      url: `permissions`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TFormPermissionItem,id:number) {
    const response = await this.api({
      url: `permissions/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `permissions/${id}`,
      method: "DELETE",
    });
    return response;
  }

  async getLists() {
    const response = await this.api({
      url: `permissions/list`,
      method: "GET"
    });
    return response.data;
  }

  // GET FORM LOCALSTORAGE
  getMyPermission() {
    const permissionJson = localStorage.getItem('permissions')
    if (permissionJson) {
      return JSON.parse(permissionJson);
    }
  }
  getMyPermissionGroup() {
    const permissionGroupsJson = localStorage.getItem('permissionGroups')
    if (permissionGroupsJson) {
      return JSON.parse(permissionGroupsJson);
    }
  }
}

export default new PermissionService();