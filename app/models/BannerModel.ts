import type { TPaginate } from "../types/Response";

export type TBannerItem = {
  id: string
  filename: string
  status: boolean
}

export type TResults = {
  data: TBannerItem[],
  meta: TPaginate
}
export class BannerModel {
  static paginate(response: {
    data: TBannerItem[],
    meta: TPaginate
  }) {
    return response
  }
}