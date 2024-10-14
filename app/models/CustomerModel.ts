import type { TPaginate } from "../types/Response";

export type TCustomerItem = {
  id: string
  name: string
  phone: string
  address: string | null
  status: boolean
  createdAt: string
  updatedAt: string
}

export type TCustomerForm = {
  name: string
  phone: string
}

export type TResults = {
  data: TCustomerItem[],
  meta: TPaginate
}
export class CustomerModel {
  static paginate(response: {
    data: TCustomerItem[],
    meta: TPaginate
  }) {
    return response
  }
}