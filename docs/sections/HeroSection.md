### HeroSection

Hero with title, badge, CTA, cards carousel, and decorative backgrounds.

#### Import
```tsx
import HeroSection from "../../sections/HeroSection.tsx";
```

#### Props
- title: rich-text string (default provided)
- description: string
- badge: string
- cards: { image: ImageWidget; title: string }[]
- ctaText: string; ctaHref: string
- backgroundElement1/backgroundElement2: Partial<BackgroundElement>
- showBackgroundElements: boolean (default: true)
- sliderInterval: number (ms, default: 4000)
- configCarousel: { items: CarouselItem[]; autoplayInterval?: number; debugHud?: boolean }

#### Usage
```tsx
<HeroSection
  title="Aceleramos a <br/>adoção de AI<br/>na sua empresa"
  description="Nossos projetos ..."
  ctaText="Fale com um especialista"
  ctaHref="/contato"
  configCarousel={{ items: [{ id: "1", imageUrl: "https://...", title: "AI Apps" }], autoplayInterval: 5 }}
/>
```