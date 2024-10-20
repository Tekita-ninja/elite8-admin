import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "NAME", value: "name", sortable: true },
  { text: "USERNAME", value: "username", sortable: true },
  { text: "ROLE", value: "role", sortable: true },
  { text: "STATUS", value: "status", sortable: true },
  { text: "ACTION", value: "actions" },
];