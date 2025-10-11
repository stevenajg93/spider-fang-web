export type PackageSlug = "landing-page" | "three-page" | "five-page" | "custom";

/** These amounts are charged by /api/checkout (Stripe). */
export const PACKAGES: Record<
  PackageSlug,
  { title: string; depositGBP: number; paid: boolean }
> = {
  "landing-page": { title: "Launch",        depositGBP: 199, paid: true },
  "three-page":   { title: "Upgrade",       depositGBP: 395, paid: true },
  "five-page":    { title: "Go Full Stack", depositGBP: 795, paid: true },
  custom:         { title: "Custom / Apps", depositGBP: 0,   paid: false },
};
