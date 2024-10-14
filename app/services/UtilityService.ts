import type { TUtility } from "../models/UtilityModel";
import type { TQueryParams } from "../types/Common";

class UtilityService {
  api = useApi();
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `utility`,
      method: "GET",
      params
    });
    return response.data;
  }
  async setup(data: TUtility) {
    const response = await this.api({
      url: `utility`,
      method: "POST",
      data
    });
    return response;
  }
  async getSummary() {
    const response = await this.api({
      url: `utility/summary`,
      method: "GET",
    });
    return response;
  }
}

export default new UtilityService();