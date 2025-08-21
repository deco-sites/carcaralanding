### IntegrationPlatformsSection

Showcases platforms where an AI Agent can be integrated, with tabs and CTA.

#### Import
```tsx
import IntegrationPlatformsSection from "../../sections/IntegrationPlatformsSection.tsx";
```

#### Props
- badgeText: string (default: "Onde Utilizar")
- title: string
- description: string
- ctaText: string; ctaUrl: string
- platforms: PlatformIntegration[] (see `../islands/PlatformTabs.tsx`)
- backgroundElement?: Partial<BackgroundElement>
- showBackgroundElements?: boolean (default: true)
- class?: string

#### Usage
```tsx
<IntegrationPlatformsSection
  platforms=[{ name: "Slack", description: "...", benefits: ["..."], accentColor: "bg-azul" }]
/>
```