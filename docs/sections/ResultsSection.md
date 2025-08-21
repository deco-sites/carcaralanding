### ResultsSection

Key metrics with optional number animation.

#### Import
```tsx
import ResultsSection from "../../sections/ResultsSection.tsx";
```

#### Props
- badgeText: string (default: "Resultados")
- title: rich-text string
- subtitle: string
- statistics: { prefix?: string; value: string; suffix?: string; afterText?: string; description: string; accentColor?: "amarelo" | "verde" | "azul" | "vermelho" }[]
- animateNumbers?: boolean (default: true)
- animationDuration?: number (ms, default: 2000)
- class?: string

#### Usage
```tsx
<ResultsSection
  statistics=[
    { prefix: "+", value: "300", description: "AI Agents operando", accentColor: "vermelho" },
    { value: "20", suffix: "x", description: "Melhor que antes", accentColor: "verde" },
  ]
/>
```