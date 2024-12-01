import type { TPaginate } from "../types/Response";
import type { TCustomerItem } from "./CustomerModel";

export type TWaitlistItem = {
  id: string
  customerId: string
  queueNumber: number
  number?: number
  numOfCall: number
  status: string
  tableNumber?: string
  numOfPax: number
  createdAt: string
  updatedAt: string
  customer: TCustomerItem
}

export type TWailistForm = {
  name?: string
  phoneNumber?: string
  customerId?: string
  queueNumber?: number
  tableNumber?: string
  numOfPax: number
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