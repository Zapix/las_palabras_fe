import { queryOptions } from "@tanstack/react-query";

import { clientV1 } from "../../api";

const fetchInfo: () => Promise<{ environment: string; version: string }> = () =>
  clientV1.GET("/info").then(({ data }) => {
    if (!data) {
      return Promise.reject("Data doesn't provided");
    } else {
      return data;
    }
  });

export const infoQueryOptions = () =>
  queryOptions({ queryKey: ["info"], queryFn: fetchInfo });
