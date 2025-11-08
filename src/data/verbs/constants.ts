import type { Times } from "./model";

export const TIMES = [
  "imperativo",
  "indicativo",
  "perfecto",
  "perfecto_subjuntivo",
  "progresivo",
  "subjuntivo"
] satisfies (keyof Times)[];
