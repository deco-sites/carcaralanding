### Header

Responsive navigation bar with logo, links, and CTA buttons.

#### Import
```tsx
import Header from "../../sections/Header.tsx";
```

#### Props
- logo: { src?: ImageWidget; alt?: string }
- navigation: {
  links: { label?: string; url?: string }[];
  buttons: { id?: string; href: string; text: string; outline?: boolean }[];
}

#### Usage
```tsx
<Header
  logo={{ src: "https://.../logo.png", alt: "Carcará" }}
  navigation={{
    links: [
      { label: "Home", url: "/" },
      { label: "Serviços", url: "/#services" },
    ],
    buttons: [
      { id: "cta-1", href: "/contato", text: "Fale conosco" },
      { id: "cta-2", href: "/demo", text: "Solicitar demo", outline: true },
    ],
  }}
/>
```