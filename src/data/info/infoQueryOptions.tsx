import { queryOptions } from "@tanstack/react-query";

import { BACKEND_URL } from "../constants.tsx";

const fetchInfo: () => Promise<{ environment: string; version: string }> = () =>
  fetch(`${BACKEND_URL}/info`).then((response) => response.json());

export const infoQueryOptions = () =>
  queryOptions({ queryKey: ["info"], queryFn: fetchInfo });
