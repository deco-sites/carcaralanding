### TheFuture

Section that highlights four AI trends with interactive cards.

#### Import
```tsx
import TheFuture from "../../sections/TheFuture.tsx";
```

#### Props
- badgeText: string (default: "O Futuro")
- title: string
- description: string
- card1/card2/card3/card4: { title: string; description: string }

#### Usage
```tsx
<TheFuture
  badgeText="O Futuro"
  title="O Futuro da IA está Aqui"
  description="Descubra como a IA ..."
  card1={{ title: "Times de IA", description: "..." }}
  card2={{ title: "IA como Commodity", description: "..." }}
  card3={{ title: "Programação Natural", description: "..." }}
  card4={{ title: "Interface Dinâmica", description: "..." }}
/>
```