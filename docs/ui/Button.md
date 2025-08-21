### Button

A styled button component with size and variant options.

#### Import
```tsx
import Button from "../../components/ui/Button.tsx";
```

#### Props
- variant: "primary" | "secondary" | "outline" | "ghost" | "link" (default: "primary")
- size: "xs" | "sm" | "md" | "lg" (default: "md")
- href: string (renders as <a>)
- disabled: boolean (default: false)
- class: string
- type: "button" | "submit" | "reset" (default: "button")
- target: string (anchor only)
- aria-label: string
- onClick: (event) => void

#### Usage
```tsx
<Button variant="primary" size="md" onClick={() => console.log("clicked")}>Get Started</Button>

<Button variant="outline" size="sm" disabled>Disabled</Button>

<Button href="/contact" variant="link" target="_blank">Talk to us</Button>
```