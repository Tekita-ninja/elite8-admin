import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "NAME", value: "name",sortable:true },
  { text: "METHOD", value: "method",sortable:true },
  { text: "CODE", value: "code",sortable:true },
  { text: "ACTIONS", value: "actions" },
];