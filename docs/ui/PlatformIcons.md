### PlatformIcons

SVG icons for platforms with subtle hover animations.

#### Import
```tsx
import { SlackIcon, TeamsIcon, DecoIcon } from "../../components/ui/PlatformIcons.tsx";
```

#### Props (common)
- size: number (default: 48)
- color: string (default: brand color)
- animated: boolean (default: true)
- className: string

#### Usage
```tsx
<div class="flex gap-6 items-center">
  <SlackIcon size={40} />
  <TeamsIcon size={40} color="#CC8B43" />
  <DecoIcon size={40} animated={false} />
</div>
```