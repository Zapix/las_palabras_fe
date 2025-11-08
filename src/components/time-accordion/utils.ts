import { type ConjugationKey, conjugationLabels } from "./constants.ts";
const isConjugationKey = (x: string): x is ConjugationKey =>
  x in conjugationLabels;

export const getConjugationLabel = (x: string): string => {
  if (isConjugationKey(x)) {
    return conjugationLabels[x];
  }
  return x;
};
