import { defineStore } from "pinia";

const routes = useRoute();
export const useCommonStore = defineStore("useCommonStore", {
  state: () => ({
    params: <{
      page: number | string;
      rowsPerPage: number | string
    } & any>{
      ...routes.query,
      page: routes.query.page ? parseInt(`${routes.query.page}`) : 1,
      rowsPerPage: routes.query.rowsPerPage ? parseInt(`${routes.query.rowsPerPage}`) : 10,
      },
    dialog:false,
  }),
  actions: {
    setDialog(state:boolean) {
      this.dialog = state
    },
    async changeParams(params: any) {
      this.params = { ...routes.query, ...params };
      navigateTo({
        path: "",
        query: { ...routes.query, ...params },
      });
    },
  },
});