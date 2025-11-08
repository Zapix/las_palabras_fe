export const objectUtils = {
  entries<T extends object>(obj: T) {
    return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
  },
  keys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
  },
  values<T extends object>(obj: T) {
    return Object.values(obj) as T[keyof T][];
  }
};
