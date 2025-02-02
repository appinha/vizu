import { isAxiosError } from "axios";

import axiosInstance from "@/api/axiosInstance";
import { parseAxiosError } from "@/api/utils";
import { HttpMethod } from "@/types";

type BaseQueryArgs<T> = {
  url: string;
  method?: HttpMethod;
  data?: T;
};

export const baseQuery = async <T>({
  url,
  method = "GET",
  data,
}: BaseQueryArgs<T>) => {
  if (!url) return {};

  try {
    const response = await axiosInstance<T>({
      url,
      method,
      data,
    });

    return { data: response.data };
  } catch (error) {
    if (isAxiosError(error))
      return {
        error: {
          status: error.response?.status,
          message: parseAxiosError(error),
        },
      };
    return { error: { status: "Unknown", message: "Unknown error" } };
  }
};
