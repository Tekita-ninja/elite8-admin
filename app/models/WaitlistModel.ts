import type { TPaginate } from "../types/Response";
import type { TCustomerItem } from "./CustomerModel";

export type TWaitlistItem = {
  id: string
  customerId: string
  queueNumber: number
  number?: number
  numOfCall: number
  status: string
  createdAt: string
  updatedAt: string
  customer: TCustomerItem
}

export type TWailistForm = {
  customerId?: string
  queueNumber?: number
  status?: string
}

export type TResults = {
  data: TWaitlistItem[],
  meta: TPaginate
}
export class WaitlistModel {
  static paginate(response: {
    data: TWaitlistItem[],
    meta: TPaginate
  }) {
    return response
  }
}