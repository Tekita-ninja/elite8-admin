import type { TCustomerForm } from "../models/CustomerModel";
import type { TQueryParams } from "../types/Common";

class CustomerService {
  api = useApi();
  async export(params?: TQueryParams) {
    const response = await this.api({
      url: `customers/export`,
      method: "GET",
      responseType: 'blob', 
      params
    });
    if (response.status === 200) {
      if (response.status === 200) {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        document.body.appendChild(link);
        link.click();
        link.remove()
        return response;
      }
    }
  }
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
  async update(data: TCustomerForm, id: number) {
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
  async deleteMany(ids: string[]) {
    const response = await this.api({
      url: `customers/delete`,
      method: "POST",
      data: {ids}
    });
    return response;
  }
}

export default new CustomerService();