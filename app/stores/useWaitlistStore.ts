import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { WaitlistModel, type TResults, type TWailistForm, type TWaitlistItem } from "../models/WaitlistModel";
import WaitlistService from "../services/WaitlistService";
import type { TQueryParams } from "../types/Common";

export const useWaitlistStore = defineStore("useWaitlistStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isCalling: false,
    results: <TResults>{},
    lastNum: <number>0,
  }),
  actions: {

    async getLastNum() {
      try {
        this.loading = true
        const response = await WaitlistService.getLastNum()
        this.lastNum = response
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },

    async get(params?: TQueryParams) {
      try {
        this.loading = true
        const response = await WaitlistService.get(params)
        this.results = WaitlistModel.paginate(response)
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async create(data: TWailistForm) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await WaitlistService.create(data)
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
    async update(data: TWailistForm,id:string) {
      const common = useCommonStore()
      try {
        this.loading = true
        const response = await WaitlistService.update(data,id)
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
        const response = await WaitlistService.delete(id)
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
    async call(data: { queueId: string }) {
      const common = useCommonStore()
      try {
        this.isCalling = true
        const response = await WaitlistService.call(data)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.isCalling = false
          toast.success('Success!', {
            description: 'success to try call customer!'
          })
        }
        return response;
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
    async play(data: { queueId: string }) {
      const common = useCommonStore()
      try {
        this.isCalling = true
        const response = await WaitlistService.play(data)
        if (response.status === 200) {
          await this.get(toQueryParams(common.$state.params))
          this.isCalling = false
          toast.success('Success!', {
            description: 'success to play call customer!'
          })
        }
        return response;
      } catch (error: any) {
        return error.response.data
      } finally {
        this.loading = false
      }
    },
  },
});