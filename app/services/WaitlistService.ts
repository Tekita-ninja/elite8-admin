import type { TWailistForm, TWaitlistItem } from "../models/WaitlistModel";
import type { TQueryParams } from "../types/Common";

class WaitlistService {
  api = useApi();
  async getLastNum() {
    const response = await this.api({
      url: `queue-pools/last-num`,
      method: "GET"
    });
    return response.data;
  }
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `queue-pools`,
      method: "GET",
      params
    });
    return response.data;
  }
  async create(data: TWailistForm) {
    const response = await this.api({
      url: `queue-pools`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TWailistForm,id:string) {
    const response = await this.api({
      url: `queue-pools/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `queue-pools/${id}`,
      method: "DELETE",
    });
    return response;
  }
  async call(data: { queueId: string }) {
    const response = await this.api({
      url: `queue-pools/call`,
      method: "POST",
      data:data
    });
    return response;
  }
  async play(data: { queueId: string }) {
    const response = await this.api({
      url: `queue-pools/play`,
      method: "POST",
      data:data
    });
    return response;
  }
}

export default new WaitlistService();