### Badge

A small label for status or categories.

#### Import
```tsx
import Badge from "../../components/ui/Badge.tsx";
```

#### Props
- variant: "default" | "outline" | "filled" (default: "outline")
- color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "neutral" (default: "secondary")
- size: "sm" | "md" | "lg" (default: "md")
- withDot: boolean (default: false)
- dotColor: same as color (default: "primary")
- class: string

#### Usage
```tsx
<Badge>New</Badge>
<Badge variant="filled" color="primary">Featured</Badge>
<Badge variant="outline" color="neutral" withDot dotColor="success">Ready</Badge>
```