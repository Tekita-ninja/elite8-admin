import type { ServerOptions } from "vue3-easy-data-table";

export const toQueryParams = (params: ServerOptions & any) => {
  return {
    ...params,
    perPage: params.rowsPerPage,
    rowsPerPage: undefined,
  };
};