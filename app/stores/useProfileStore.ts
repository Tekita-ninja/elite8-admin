import { defineStore } from "pinia";
export const useProfileStore = defineStore("useProfileStore", {
  state: () => ({
    profile: <any>{},
  }),
  actions: {
    async getMyProfile() {
      const c_user = localStorage.getItem('c_user');
      const userObj = c_user && JSON.parse(c_user)
      this.profile = userObj;
    },
  },
});