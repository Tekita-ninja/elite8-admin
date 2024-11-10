import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "NAME", value: "name" },
  { text: "PHONE", value: "phone" },
  { text: "NUM OF VISIT", value: "_count.visitHistories" },
  { text: "ACTIONS", value: "actions" },
];