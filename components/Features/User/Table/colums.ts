import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "NAME", value: "name", sortable: true },
  { text: "EMAIL", value: "email", sortable: true },
  { text: "PHONE", value: "phone", sortable: true },
  { text: "IS ACTIVE?", value: "status", sortable: true },
  { text: "ACTIONS", value: "actions", width: 160 },
];