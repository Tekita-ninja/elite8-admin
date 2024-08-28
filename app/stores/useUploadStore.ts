import { defineStore } from "pinia";

import type { TUploadResponse } from "../models/UploadModel";
import UploadService from "../services/UploadService";
export const useUploadStore = defineStore("useUploadStore", {
  state: () => ({
    dialog: false,
    isUploading:false
  }),
  actions: {
    async uploadImage(file: any,folder?:string): Promise<TUploadResponse> {
      try {
        this.isUploading = true
        const response = await UploadService.uploadImage(file,folder)
        this.dialog= false
        return response.data
      } catch (error: any) {
        return error.response.data
      } finally {
        this.isUploading = false
      }
    },
  },
});