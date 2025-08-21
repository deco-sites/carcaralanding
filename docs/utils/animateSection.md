### Utils: animateSection

Helpers to apply consistent animations to sections.

#### Import
```tsx
import { sectionAnimations, animateElement, withSectionAnimation } from "../../utils/animateSection.tsx";
```

#### Preset configs
- sectionAnimations.container
- sectionAnimations.header
- sectionAnimations.content
- sectionAnimations.media
- sectionAnimations.cards
- sectionAnimations.fromLeft
- sectionAnimations.fromRight
- sectionAnimations.cta

#### Usage: animateElement
```tsx
const title = <h2 class="text-white">Title</h2>;
return animateElement(title, sectionAnimations.header);
```

#### Usage: withSectionAnimation
```tsx
function MySection() {
  return <div>Content</div>;
}

const AnimatedSection = withSectionAnimation(MySection);

// Override defaults
const AnimatedSlow = withSectionAnimation(MySection, { type: "fade-in", duration: 1.2 });
```