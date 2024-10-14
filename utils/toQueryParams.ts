import type { ServerOptions } from "vue3-easy-data-table";

export const toQueryParams = (params: ServerOptions & any) => {
  return {
    ...params,
    rowsPerPage: params.rowsPerPage,
    // rowsPerPage: undefined,
  };
};