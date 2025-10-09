export type PackageSlug = "landing-page" | "three-page" | "five-page" | "custom";

export const PACKAGES: Record<
  PackageSlug,
  { title: string; depositGBP: number; paid: boolean }
> = {
  "landing-page": { title: "Landing Page", depositGBP: 0, paid: false },
  "three-page":   { title: "3 Page Website", depositGBP: 400, paid: true },  // 50% of £800
  "five-page":    { title: "5 Page Website", depositGBP: 495, paid: true },  // 50% of £990
  custom:         { title: "Custom / Apps", depositGBP: 0, paid: false },
};
