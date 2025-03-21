# Carcará Animation System

The Carcará landing page uses a consistent and flexible animation system that
provides smooth, non-disruptive animations across all sections. This document
explains how to use the animation system in your components.

## Table of Contents

- [Overview](#overview)
- [Animation Types](#animation-types)
- [Using Animation Components](#using-animation-components)
- [Animation Presets](#animation-presets)
- [Helper Functions](#helper-functions)
- [Best Practices](#best-practices)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)

## Overview

The animation system is built using the @motionone/dom library and provides
scroll-triggered animations that appear when elements enter the viewport. The
system supports various animation types, including fade-in, slide-up, slide-in
from left/right, scale-in, and a special mask-up effect for text.

## Animation Types

The following animation types are available:

- `fade-in`: Simple opacity transition from 0 to 1
- `slide-up`: Elements slide up from below while fading in
- `slide-in-left`: Elements slide in from the left while fading in
- `slide-in-right`: Elements slide in from the right while fading in
- `scale-in`: Elements scale up slightly while fading in
- `mask-up`: Text reveals line by line with a mask effect (best for headings)
- `none`: No animation (useful for disabling animations in specific contexts)

## Using Animation Components

### Basic Usage

Wrap any component with the `Animation` component to apply animations:

```tsx
import { Animation } from "../components/ui/Animation.tsx";

<Animation type="fade-in" duration={0.5}>
  <YourComponent />
</Animation>;
```

### Animation Props

The `Animation` component accepts the following props:

| Prop              | Type          | Default                | Description                                        |
| ----------------- | ------------- | ---------------------- | -------------------------------------------------- |
| `type`            | AnimationType | `"fade-in"`            | The type of animation to apply                     |
| `duration`        | number        | `0.5`                  | Duration of the animation in seconds               |
| `delay`           | number        | `0`                    | Delay before the animation starts in seconds       |
| `staggerChildren` | boolean       | `false`                | Whether to stagger animations of children          |
| `staggerDelay`    | number        | `0.1`                  | Delay between each child's animation               |
| `threshold`       | number        | `0.2`                  | How much of the element must be visible to trigger |
| `rootMargin`      | string        | `"0px 0px -100px 0px"` | Margin around the root                             |
| `once`            | boolean       | `true`                 | Whether to trigger the animation only once         |
| `class`           | string        | `""`                   | Additional CSS classes                             |
| `style`           | object        | `{}`                   | Additional inline styles                           |

### Example: Heading with Mask-Up Animation

```tsx
<Animation type="mask-up" duration={0.8}>
  <h1>
    This heading will reveal<br />line by line<br />with a mask effect
  </h1>
</Animation>;
```

### Example: Staggered Children

```tsx
<Animation type="fade-in" staggerChildren={true} staggerDelay={0.1}>
  <div>First item</div>
  <div>Second item (appears 0.1s after first)</div>
  <div>Third item (appears 0.2s after first)</div>
</Animation>;
```

## Animation Presets

The animation system provides convenient presets to ensure consistent animations
across the site:

```tsx
import { animations } from "../components/ui/Animation.tsx";

<Animation {...animations.presets.maskUp}>
  <h1>Section Heading</h1>
</Animation>;
```

Available presets:

- `fadeIn`: Standard fade-in animation
- `slideUp`: Slide up from below
- `slideInLeft`: Slide in from left
- `slideInRight`: Slide in from right
- `scaleIn`: Scale in animation
- `maskUp`: Text mask-up animation for headings
- `staggeredChildren`: Fade-in with staggered children

## Helper Functions

The animation system also provides helper functions in
`utils/animateSection.tsx`:

### Section Animation Presets

```tsx
import { sectionAnimations } from "../utils/animateSection.tsx";

<Animation {...sectionAnimations.header}>
  <h2>Section Header</h2>
</Animation>;
```

Available section animation presets:

- `container`: For main section containers
- `header`: For section headings (uses mask-up)
- `content`: For content blocks
- `media`: For images and media
- `cards`: For card grids
- `fromLeft`: For elements appearing from left
- `fromRight`: For elements appearing from right
- `cta`: For call-to-action elements

### Animate Element Helper

```tsx
import { animateElement } from "../utils/animateSection.tsx";

const heading = <h2>Section Heading</h2>;
{
  animateElement(heading, sectionAnimations.header);
}
```

### Higher-Order Component Pattern

```tsx
import { withSectionAnimation } from "../utils/animateSection.tsx";

// Create an animated version of your section component
const AnimatedSection = withSectionAnimation(YourSectionComponent);

// Use it with custom animation props
<AnimatedSection
  {...sectionProps}
  animationProps={{ type: "slide-up", duration: 0.8 }}
/>;
```

## Best Practices

1. **Use mask-up for headings**: Always use the mask-up animation for important
   section headings.
2. **Stagger content items**: Use staggered animations for lists, cards, and
   multiple items.
3. **Keep animations subtle**: Don't overdo animations, keep them subtle and
   purposeful.
4. **Maintain consistency**: Use the same animation patterns across similar
   sections.
5. **Consider load order**: Elements at the top of the viewport should animate
   before elements further down.
6. **Space out delays**: Use the delay prop to create a natural flow of
   animations.

## Performance Considerations

- Animations are triggered using the Intersection Observer API for optimal
  performance.
- Using `once: true` (the default) ensures animations only run once.
- Images and heavy content use a lower threshold to start loading earlier.
- Staggered animations use minimal transform properties for better performance.

## Accessibility

- All animations respect the user's `prefers-reduced-motion` setting.
- Animation durations are kept reasonably short (0.5s to 0.8s).
- No animations interfere with the site's functionality or readability.
- Content is visible and usable even if JavaScript is disabled.

---

For more examples and implementation details, see the
`examples/SectionAnimationExamples.tsx` file.
