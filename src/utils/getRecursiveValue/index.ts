import { RecursiveKeyOf } from "./types";
import { ReactNode } from 'react';

export const getRecursiveValue = <T extends Record<string, any>, V extends ReactNode>(
  object: T | undefined,
  key: RecursiveKeyOf<T>
): V | undefined => {
  if (object) {
    const keys = key.split(/\.|\[['"`]|['"`]\]/g).filter(Boolean);

    let value = object;
    keys.forEach((key: string) => {
      value = value[key];
    });

    return value as V | undefined;
  }
};