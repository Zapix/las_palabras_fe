import type { Times } from "../../data/verbs/model";

export const timeTypeLabels: { [K in keyof Times]: string } = {
  imperativo: "Imperativo",
  indicativo: "Indicativo",
  perfecto: "Perfecto",
  perfecto_subjuntivo: "Perfecto Subjuntivo",
  progresivo: "Progresivo",
  subjuntivo: "Subjuntivo"
};

export type ConjugationKey = {
  [K in keyof Times]: keyof Times[K];
}[keyof Times];
export const conjugationLabels: { [K in ConjugationKey]: string } = {
  afirmativo: "Afirmativo",
  negativo: "Negativo",
  condicional: "Condicional",
  futuro: "Futuro",
  imperfecto: "Imperfecto",
  presente: "Presente",
  preterito: "Preterito",
  pasado: "Pasado",
  imperfecto2: "Imperfecto 2"
};
