import type { TPaginate } from "../types/Response";

export type TUser = {
  id: number
  name: string
  email: string
  phone: string | null,
  domainName: string | null,
  status: boolean
}

export type TFormUser = {
  name: string
  username: string
  status?: boolean
  password: string
}

export type TFormEditUser = Partial<TFormUser>


export type TResults = {
  data: TUser[],
  meta: TPaginate
}
export class UserModel {
  static paginate(response: {
    data: TUser[],
    meta: TPaginate
  }) {
    return response
  }
}
