import type { loader } from "./list";

import type { ArrayItem } from "../../utils/ArrayItem";
import type { LoaderReturnData } from "../utils";

export type Vocabulary = NonNullable<LoaderReturnData<typeof loader>>["items"];
export type Word = ArrayItem<Vocabulary>;
export type PartOfSpeech = Word["part_of_speech"];

type EditWordInputs = Pick<
  Word,
  "spanish" | "russian" | "part_of_speech" | "is_verified"
>;
