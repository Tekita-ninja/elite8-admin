import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { TQueryParams } from "../types/Common";
import { CustomerModel, type TCustomerForm, type TCustomerItem, type TResults } from "../models/CustomerModel";
import CustomerService from "../services/CustomerService";
export const useCustomerStore = defineStore("useCustomerStore", {
  state: () => ({
    dialog: false,
    loading: false,
    results: <TResults>{},
    lists: <TCustomerItem[]>[],
    detail: <TCustomerItem>{},
  }),
  actions: {
    async list() {
      try {
        this.loading = true
        const response = await CustomerService.list()
        this.lists = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await CustomerService.get(params)
        this.results = CustomerModel.paginate(response)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async show(id: string) {
      try {
        this.loading = true
        const response = await CustomerService.show(id)
        this.detail = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async getByPhone(phone: string) {
      try {
        this.loading = true
        const response = await CustomerService.getByPhone(phone)
        this.detail = response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TCustomerForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await CustomerService.create(data)
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success create data!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async update(data: TCustomerForm,id:number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await CustomerService.update(data,id)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success update data!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async delete(id: number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await CustomerService.delete(id)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description:'success delete data!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
  },
});