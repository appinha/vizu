import { get } from "@/api/fetchUtils";

export default {
  async getExpenses() {
    const data = await get("/api/expenses/");

    if (!data) throw new Error("No response");

    return await data.json();
  },
};
