import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { BannerModel, type TBannerItem, type TResults } from "../models/BannerModel";
import BannerService from "../services/BannerService";
import type { TQueryParams } from "../types/Common";
export const useBannerStore = defineStore("useBannerStore", {
  state: () => ({
    dialog: false,
    loading: false,
    isDeleting: false,
    isUploading: false,
    results: <TResults>{},
    lists: <TBannerItem[]>[],
  }),
  actions: {
    async create(files: File[]) {
      const common = useCommonStore()
      this.dialog = true;
      try {
        this.isUploading = true
        const response = await BannerService.create(files)
        if (response.count > 0) {
          await this.get(toQueryParams(common.$state.params))
          this.dialog = false
          toast.success('Success!', {
            description: 'success upload banners!'
          })
        }
      } catch (error: any) {
        return error.response
      } finally {
        this.isUploading = false
      }
    },
    async list() {
      try {
        this.loading = true
        const response = await BannerService.list()
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
        const response = await BannerService.get(params)
        this.results = BannerModel.paginate(response)
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
        const response = await BannerService.delete(id)
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