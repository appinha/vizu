export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type Expense = {
  date: Date;
  value: number;
  description: string;
  category: string;
};
