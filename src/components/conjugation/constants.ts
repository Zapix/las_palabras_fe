import type { RegularConjugation } from "../../data/verbs/model";

type ConjugationLabelMap = { [key in keyof RegularConjugation]: string };
export const ConjugationLabels: ConjugationLabelMap = {
  first_person_singular: "Yo",
  second_person_singular: "Tú",
  third_person_singular: "Él/Ella/Usted",
  first_person_plural: "Nosotros/Nosotras",
  second_person_plural: "Vosotros/Vosotras",
  third_person_plural: "Ellos/Ellas/Ustedes"
};
