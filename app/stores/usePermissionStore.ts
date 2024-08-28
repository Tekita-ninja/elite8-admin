import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { PermissionModel, type TFormPermissionItem, type TPermissionList, type TResults } from "../models/PermissionModel";
import PermissionService from "../services/PermissionService";
import type { TQueryParams } from "../types/Common";
export const usePermissionStore = defineStore("usePermissionStore", {
  state: () => ({
    dialog: false,
    loading: false,
    results: <TResults>{},
    lists: <TPermissionList[]>[]
  }),
  actions: {
    async getLists() {
      try {
        this.loading = true
        const response = await PermissionService.getLists()
        this.lists = PermissionModel.lists(response)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await PermissionService.get(params)
        this.results = PermissionModel.paginate(response)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TFormPermissionItem) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await PermissionService.create(data)
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
    async update(data: TFormPermissionItem,id:number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await PermissionService.update(data,id)
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
        const response = await PermissionService.delete(id)
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