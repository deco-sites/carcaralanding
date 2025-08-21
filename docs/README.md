# Carcará Landing Page Documentation

Welcome to the documentation for the Carcará AI Landing Page. This guide covers public APIs, UI components, sections, SDK utilities, routes, and usage examples.

## Contents
- UI Components: see `./ui/`
  - `Button.md`, `Badge.md`, `Animation.md`, `Typography.md`, `Icon.md`, `Slider.md`, `PlatformIcons.md`, `ThemeProvider.md`, `Carrosel.md`, `Layout.md`
- Sections: see `./sections/`
  - `README.md` (overview), `HeroSection.md`, `Header.md`, `FooterSection.md`, `TheFuture.md`, `CTASection.md`, `Theme.md`
- SDK: see `./sdk/`
  - `messages.md`, `useId.md`
- Utilities: see `./utils/`
  - `animateSection.md`
- Routes and App Entry: see `./routes/`
  - `README.md`

## Getting Started
- Stack: Deno + Fresh + Preact + Tailwind CSS
- Run locally: `deno task dev`
- Tailwind config: `tailwind.config.ts`

## Conventions
- Components follow atomic design and are typed with TypeScript
- Use Tailwind classes for styling
- Prefer composition and variant props for customization