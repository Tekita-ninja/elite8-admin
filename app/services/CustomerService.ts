import type { TCustomerForm } from "../models/CustomerModel";
import type { TQueryParams } from "../types/Common";

class CustomerService {
  api = useApi();
  async list() {
    const response = await this.api({
      url: `customers/all`,
      method: "GET"
    });
    return response.data;
  }
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `customers`,
      method: "GET",
      params
    });
    return response.data;
  }
  async show(id: string) {
    const response = await this.api({
      url: `customers/${id}`,
      method: "GET"
    });
    return response;
  }
  async getByPhone(phone: string) {
    const response = await this.api({
      url: `customers/phone/${phone}`,
      method: "GET"
    });
    return response;
  }
  async create(data: TCustomerForm) {
    const response = await this.api({
      url: `customers`,
      method: "POST",
      data
    });
    return response;
  }
  async update(data: TCustomerForm,id:number) {
    const response = await this.api({
      url: `customers/${id}`,
      method: "PATCH",
      data
    });
    return response;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `customers/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new CustomerService();