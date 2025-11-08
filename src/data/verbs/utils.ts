import type { Times, Verb } from "./model";

export const getTimeData = <K extends keyof Times>(
  key: K,
  data: Verb
): Verb[K] => data[key];
