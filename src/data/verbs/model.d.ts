import type { loader as listLoader } from "./list";
import type { loader as detailsLoader } from "./details";
import type { components } from "../../api/v1";

import type { ArrayItem } from "../../utils/ArrayItem";
import type { LoaderReturnData } from "../utils";

export type VerbsListLoaderData = NonNullable<
  LoaderReturnData<typeof listLoader>
>;
export type LightVerb = ArrayItem<VerbsListLoaderData["items"]>;

export type VerbDetailsLoaderData = NonNullable<
  LoaderReturnData<typeof detailsLoader>
>;
export type Verb = VerbDetailsLoaderData;
export type Times = {
  [K in keyof Omit<
    Verb,
    "id" | "verb" | "created_at" | "updated_at"
  >]-?: NonNullable<Verb[K]>;
};

export type RegularConjugation = components["schemas"]["RegularConjugacion"];
