import { defineStore } from "pinia";
import { RoleModel, type TFormRole, type TResults } from "../models/RoleModel";
import RoleService from "../services/RoleService";
import type { TQueryParams } from "../types/Common";
import { toast } from "vue-sonner";
export const useRoleStore = defineStore("useRoleStore", {
  state: () => ({
    dialog: false,
    loading: false,
    results: <TResults>{}
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await RoleService.get(params)
        this.results = RoleModel.paginate(response)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TFormRole) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await RoleService.create(data)
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
    async update(data: TFormRole,id:number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await RoleService.update(data,id)
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
        const response = await RoleService.delete(id)
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