import type { TQueryParams } from "../types/Common";

class BannerService {
  api = useApi();
  async create(files: File[]) {
    const form = new FormData();
    Array.from(files).forEach(item => {
      form.append('files',item)
    });
    const response = await this.api({
      url: `banners`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    });
    return response.data;
  }
  async list() {
    const response = await this.api({
      url: `banners/all`,
      method: "GET"
    });
    return response.data;
  }
  async get(params?: TQueryParams) {
    const response = await this.api({
      url: `banners`,
      method: "GET",
      params
    });
    return response.data;
  }
  async delete(id: number) {
    const response = await this.api({
      url: `banners/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

export default new BannerService();