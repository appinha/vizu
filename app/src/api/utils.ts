import { AxiosError } from "axios";

import { isString } from "@/utils";

export function parseAxiosError(error: AxiosError<unknown>) {
  if (error.response?.data) {
    if (isString(error.response?.data)) return error.response?.data;
    return JSON.stringify(error.response?.data);
  }
  return error.message ?? "Unknown error";
}
