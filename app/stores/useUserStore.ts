import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { UserModel, type TFormEditUser, type TFormUser, type TResults } from "../models/UserModel";
import UserService from "../services/UserService";
import type { TQueryParams } from "../types/Common";
export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isSubmitting: false,
    results: <TResults>{}
  }),
  actions: {
    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await UserService.get(params)
        this.results = UserModel.paginate(response)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TFormUser) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await UserService.create(data)
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success create data!'
          })
        }
      } catch (error: any) {
        this.dialog = true
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async update(data: TFormEditUser,id:number) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await UserService.update(data,id)
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
        const response = await UserService.delete(id)
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
    async assignRole(userId: number, roleId:number) {
      const common = useCommonStore()
      try {
        this.isSubmitting = true
        const response = await UserService.assignRole(userId,roleId)
        if (response.status === 201) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description:'success update permission!'
          })
        }
      } catch (error: any) {
        return error.response.data
      } finally {
        this.isSubmitting = false
      }
    },
  },
});