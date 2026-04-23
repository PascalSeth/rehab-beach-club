import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { useLayoutEffect, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
