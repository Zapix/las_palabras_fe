import type { loader } from "./list";

import type { ArrayItem } from "../../utils/ArrayItem";
import type { LoaderReturnData } from "../utils";

export type VocabularyListLoaderData = NonNullable<
  LoaderReturnData<typeof loader>
>;
export type Vocabulary = VocabularyListLoaderData["items"];
export type Word = ArrayItem<Vocabulary>;
export type PartOfSpeech = Word["part_of_speech"];

type EditWordInputs = Pick<
  Word,
  "spanish" | "russian" | "part_of_speech" | "is_verified"
>;
