### Carrosel

Image carousel with autoplay and debug HUD.

#### Import
```tsx
import Carrosel, { type CarouselItem } from "../../components/ui/Carrosel.tsx";
```

#### Props
- items: CarouselItem[]
- autoplayInterval?: number (seconds; 0 to disable)
- debugHud?: boolean

#### CarouselItem
- id: string
- imageUrl: ImageWidget
- title: string

#### Usage
```tsx
const items: CarouselItem[] = [
  { id: "1", imageUrl: "https://placehold.co/800x400", title: "Slide 1" },
  { id: "2", imageUrl: "https://placehold.co/800x400", title: "Slide 2" },
];

<Carrosel items={items} autoplayInterval={5} />
```