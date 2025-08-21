### FooterSection

Footer with columns, social icons, legal links, and optional mobile logo.

#### Import
```tsx
import FooterSection from "../../sections/FooterSection.tsx";
```

#### Props
- useCasesColumn: { title: string; show?: boolean; links: { label: string; href: string }[] }
- transformationStoriesColumn: same shape
- industriesColumn: same shape
- legalLinks: { label: string; href: string }[]
- socialIcons: { type: "twitter" | "linkedin" | "instagram" | "facebook"; href: string; ariaLabel: string }[]
- rightDecoration: ImageWidget
- mobileLogo?: { image: ImageWidget; alt: string; href: string }

#### Usage
```tsx
<FooterSection
  useCasesColumn={{ title: "Casos de Uso", show: true, links: [{ label: "SEO Agents", href: "/use-cases/seo" }]}}
  transformationStoriesColumn={{ title: "Histórias", show: true, links: [{ label: "Varejo + IA", href: "/blog/retail-ai" }]}}
  legalLinks={[{ label: "Privacy Policy", href: "/privacy" }]}
  socialIcons={[{ type: "linkedin", href: "https://linkedin.com/company/carcara", ariaLabel: "LinkedIn" }]}
/>
```