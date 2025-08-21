### Sections Overview

Sections compose the landing page. They are reusable, SSR-friendly Preact components styled with Tailwind.

#### Common patterns
- Exported `Props` or `*SectionProps` interface for content and layout
- Optional `badgeText`, `title`, `description`, `cta*` fields
- Use alongside `Layout` and `ContentContainer`

#### Example composition
```tsx
import Layout from "../../components/Layout.tsx";
import HeroSection from "../../sections/HeroSection.tsx";
import TheFuture from "../../sections/TheFuture.tsx";

<Layout>
  <HeroSection title="..." description="..." />
  <TheFuture />
</Layout>
```

See individual docs for each section below.