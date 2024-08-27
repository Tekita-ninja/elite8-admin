import { defineStore } from "pinia";
export const useMenuStore = defineStore("useMenuStore", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    openMenu() {
      this.isOpen = true;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
});