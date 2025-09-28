export const DEMO = true
export const DEFAULT_TIMEZONE = "Europe/London"
export const APP_BASE_URL = "http://localhost:3000"

export const BRAND = {
  name: "Spider Fang Web Services",
  tagline: "Web that bites back.",
  subhead: "From strategy to shipped — fast.",
  pricingStrap: "Launch from £500. Own your growth.",
} as const

export const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 17, // 5 PM
  timezone: DEFAULT_TIMEZONE,
  daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
} as const
