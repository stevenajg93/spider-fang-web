# Spider Fang Web Services

> Web that bites back. From strategy to shipped — fast.

A high-conversion website for a boutique web studio, built with Next.js, TypeScript, and Tailwind CSS. Features a cinematic black and red aesthetic with sophisticated animations and comprehensive business functionality.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

The application runs fully offline in demo mode — no API keys required for testing.

## Features

- **High-conversion landing page** with animated spider web background
- **Booking system** with calendar integration and consultation scheduling
- **Package sales** with Stripe checkout integration
- **AI chat widget** with contextual responses and lead qualification
- **Admin dashboard** for lead management and analytics
- **Responsive design** optimized for all devices
- **Demo mode** for offline development and testing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for booking dialog state
- **Icons**: Lucide React

## Architecture

The application uses an adapter pattern for external integrations:

- `calendarAdapter` - Google Calendar integration for consultation booking
- `paymentsAdapter` - Stripe integration for package purchases
- `aiAdapter` - OpenAI integration for chat widget responses

In demo mode, all adapters return mock data for full offline functionality.

## Going Live

To deploy with real integrations:

1. **Calendar Integration**: Add `GOOGLE_REFRESH_TOKEN` environment variable
2. **Payment Processing**: Add `STRIPE_SECRET_KEY` environment variable
3. **AI Chat**: Add `OPENAI_API_KEY` environment variable
4. **Configuration**: Set `APP_BASE_URL` and `DEFAULT_TIMEZONE`

The adapters will automatically switch from demo mode to production when environment variables are detected.

## Development

\`\`\`bash

# Development server

npm run dev

# Type checking

npm run typecheck

# Linting

npm run lint

# Code formatting

npm run format

# Unit tests

npm run test

# End-to-end tests

npm run test:e2e

# Production build

npm run build
\`\`\`

## Project Structure

\`\`\`
├── app/ # Next.js App Router pages
├── components/ # React components
│ ├── booking/ # Booking system components
│ ├── chat/ # AI chat widget
│ ├── layout/ # Navigation, footer, etc.
│ ├── sections/ # Homepage sections
│ └── ui/ # shadcn/ui components
├── data/ # Static data (services, pricing, etc.)
├── hooks/ # Custom React hooks
├── lib/ # Utilities and configuration
│ ├── adapters/ # External service integrations
│ ├── config.ts # Application configuration
│ └── utils.ts # Utility functions
└── scripts/ # Database and deployment scripts
\`\`\`

## Design System

- **Colors**: Deep black, fang red (#DC2626), iron gray, white
- **Typography**: Bebas Neue (headings), Inter (body)
- **Aesthetic**: Cinematic, high-contrast, sophisticated
- **Animations**: Subtle hover effects, spider web background

## License

© 2025 Spider Fang Web Services. All rights reserved.
