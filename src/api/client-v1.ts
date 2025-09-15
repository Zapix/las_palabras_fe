import createClient from "openapi-fetch";
import type { paths } from "./v1";
import { BACKEND_URL } from "./constants.tsx";

export const clientV1 = createClient<paths>({ baseUrl: BACKEND_URL });
