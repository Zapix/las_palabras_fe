export type ArrayItem<T> = T extends Array<infer Item> ? Item : never;
