### TestimonialsSection

Client testimonials with auto-sliding carousel and decorative background.

#### Import
```tsx
import TestimonialsSection from "../../sections/TestimonialsSection.tsx";
```

#### Props
- badgeText: string (default: "Depoimentos")
- title: string
- description: string
- ctaText: string; ctaUrl: string
- testimonials: Testimonial[] where Testimonial = { name: string; position: string; company: string; quote: rich-text; avatar?: ImageWidget; logo?: ImageWidget; accentColor?: string }
- backgroundElement?: Partial<BackgroundElement>
- showBackgroundElements?: boolean (default: true)
- autoSlideInterval?: number (ms, default: 6000)
- class?: string

#### Usage
```tsx
<TestimonialsSection
  testimonials={[{ name: "Maria", position: "Gerente", company: "Acme", quote: "Excelente" }]}
  ctaText="Fale conosco"
  ctaUrl="/contato"
/>
```