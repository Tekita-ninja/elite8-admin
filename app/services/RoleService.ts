import type { TFormRole } from "../models/RoleModel";
import type { TQueryParams } from "../types/Common";

class RoleService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `roles`,
      method: "GET",
      params
    });
    return response.data;
  }
  async create(data: TFormRole) {
    const response = await this.api({
      url: `roles`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TFormRole,id:number) {
    const response = await this.api({
      url: `roles/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `roles/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new RoleService();