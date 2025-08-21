### PricingSection

Three pricing cards with customizable content.

#### Import
```tsx
import PricingSection from "../../sections/PricingSection.tsx";
```

#### Props
- badgeText: string (default: "PRICING")
- title: string
- description: string
- consultingPlan?: Partial<{ title: string; price: string; bgColor?: string; features: string[]; ctaText: string; ctaUrl: string }>
- pilotPlan?: same shape
- developmentPlan?: same shape
- backgroundImage?: ImageWidget
- class?: string

#### Usage
```tsx
<PricingSection
  consultingPlan={{ title: "CONSULTING", price: "$200/hr", features: ["Workshops"], ctaText: "Book", ctaUrl: "/contact" }}
  pilotPlan={{ title: "PILOT PROJECT", price: "Get quote", features: ["30-60 days"], ctaText: "Quote", ctaUrl: "/quote" }}
  developmentPlan={{ title: "AGENT DEV", price: "$6,500/m", features: ["Dedicated Team"], ctaText: "Book", ctaUrl: "/contact" }}
/>
```