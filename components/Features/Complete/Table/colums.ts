import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "NAME", value: "customer.name" },
  { text: "PHONE", value: "customer.phone" },
  { text: "QUEUE NUMBER", value: "queueNumber" },
  { text: "NUMBER OF CALLS", value: "numOfCall" },
  { text: "STATUS", value: "status" },
];