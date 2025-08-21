### Animation

Wrap content with scroll-triggered animations.

#### Import
```tsx
import { Animation } from "../../components/ui/Animation.tsx";
```

#### Props
- type: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right" | "scale-in" | "mask-up" | "none" (default: "fade-in")
- duration: number (seconds, default: 0.5)
- delay: number (seconds, default: 0)
- staggerChildren: boolean (default: false)
- staggerDelay: number (seconds, default: 0.1)
- threshold: number (0-1, default: 0.2)
- rootMargin: string (default: "0px 0px -100px 0px")
- once: boolean (default: true)
- class: string
- style: JSX.CSSProperties

#### Presets
```ts
import { animations } from "../../components/ui/Animation.tsx";
animations.section({ type: "fade-in" });
animations.presets.slideUp;
```

#### Usage
```tsx
<Animation type="slide-up" staggerChildren>
  <h2>Title</h2>
  <p>Body</p>
</Animation>

<Animation type="mask-up">
  <h1>Line 1<br/>Line 2</h1>
</Animation>
```