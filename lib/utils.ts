import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, perPerson = false): string {
  return `€${price}${perPerson ? "/pessoa" : ""}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
