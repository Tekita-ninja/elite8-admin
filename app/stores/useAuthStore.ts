import AuthService from "@/app/services/AuthService";
import { defineStore } from "pinia";
import type { TLogin } from "@/app/types/Auth";

const api = useApi();

export type UserInterface = {
  username: string;
  password: string;
};
export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async loginUser(dataValue: TLogin) {
      try {
        this.loading = true;
        const result = await AuthService.login(dataValue);
        if (result) {
          this.authenticated = true;
        }
      } catch (error: any) {
        return error.response.data;
      } finally {
        this.loading = false;
      }
    },
    async logoutUser() {
      const access_token = useCookie("access_token");
      const refresh_token = useCookie("refresh_token");
      this.authenticated = false;
      access_token.value = null;
      refresh_token.value = null;
      localStorage.removeItem("user");
      window.location.reload()
    }
  },
});