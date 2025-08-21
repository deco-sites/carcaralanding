### FAQSection

Expandable FAQs with contact link embedded in text.

#### Import
```tsx
import FAQSection from "../../sections/FAQSection.tsx";
```

#### Props
- badgeText: string (default: "FAQ")
- title: string
- contactText: string (contains the link text)
- contactLinkText: string (the portion to turn into a link)
- contactUrl: string
- items: { question: string; answer: string }[]
- class?: string

#### Usage
```tsx
<FAQSection
  contactText="Se não encontrar o que procura, entre em contato conosco."
  contactLinkText="entre em contato conosco"
  contactUrl="/contato"
  items={[{ question: "Como funciona?", answer: "Com AI Agents." }]}
/>
```