### CTASection

Call-to-action with background image and prominent CTA box.

#### Import
```tsx
import CTASection from "../../sections/CTASection.tsx";
```

#### Props
- title: string (supports line breaks with \n)
- subtitle: string
- buttonText: string
- buttonUrl: string
- backgroundImage?: ImageWidget
- showBackgroundElements?: boolean (default: true)
- class?: string

#### Usage
```tsx
<CTASection
  title={"Pronto para\ncriar seu\ntime de AI?"}
  subtitle="Agende uma reunião de 30min com nosso time"
  buttonText="Agendar reunião"
  buttonUrl="/contato"
/>
```