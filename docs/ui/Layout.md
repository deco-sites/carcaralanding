### Layout and ContentContainer

Page layout wrappers.

#### Import
```tsx
import Layout, { ContentContainer } from "../../components/Layout.tsx";
```

#### Layout Props
- className?: string
- children: ComponentChildren

#### ContentContainer Props
- className?: string
- children: ComponentChildren

#### Usage
```tsx
<Layout>
  <section class="bg-ca-900">
    <ContentContainer className="py-16">
      <h2 class="text-ca-50">Section</h2>
    </ContentContainer>
  </section>
</Layout>
```