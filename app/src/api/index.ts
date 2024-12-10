import { get } from "@/api/fetchutils";

export default {
  async healthcheck() {
    console.log("pinging backend");
    const data = await get("/api/_healthcheck/");
    if (!data) {
      return { status: "error" };
    }
    return await data.json();
  },
};
