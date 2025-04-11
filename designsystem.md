# Carcará Design System

## Color System

### Primary Colors

- **Background:** `bg-ca-900` (Dark background)
- **Text:**
  - `text-ca-50` (Brightest text)
  - `text-ca-100` (Light text)
  - `text-ca-200` (Medium light text)
  - `text-ca-300` (Muted text)

### Accent Colors

- **Primary:** `bg-azul` (Blue accent)
- **Secondary:** `bg-verde` (Green accent)
- **Tertiary:** `bg-vermelho` (Red accent)
- **Quaternary:** `bg-amarelo` (Yellow accent)

## Typography

### Font Families

- **Headings:** `font-serif` (For titles, hero text)
- **Body:** System font stack (default sans-serif)

### Font Sizes

- **Headings:**
  - Hero: `text-4xl sm:text-5xl lg:text-[5.25rem]`
  - Section: `text-3xl sm:text-4xl lg:text-5xl`
- **Body:**
  - Default: Base text size
  - Small: `text-sm`

### Font Weights

- **Regular:** `font-normal`
- **Medium:** `font-medium`

### Typography Components

- **HeroTitle:** Large serif font with negative tracking for main page headings
- **Eyebrow:** Small uppercase text often placed above main titles
- **Body:** Standard text with various size options for content paragraphs

## Spacing

### Vertical Spacing

- **Section Padding:** `py-16 md:py-24 lg:py-32`
- **Component Spacing:** `mb-8 sm:mb-12 lg:mb-16`
- **Element Spacing:** `gap-4 sm:gap-6`

### Horizontal Spacing

- **Container Padding:** `px-4 sm:px-16`
- **Element Padding:** `px-3 sm:px-6 md:px-8 py-3 sm:py-4`

## Layouts

### Grid System

- **Main Layout:** 12-column grid `grid-cols-1 lg:grid-cols-12`
- **Two Column:** `flex-col md:flex-row` with `w-full md:w-1/2`

### Containers

- **ContentContainer:** Max width with centered alignment, available through
  import
- **Section Container:** Full width with overflow hidden

## Components

### Buttons

- **Variants:**
  - Primary: `variant="primary" size="md"`
  - Outline: `variant="outline" size="md"`
- **Characteristics:**
  - No border radius
  - Consistent padding
  - Text centered

### Badges

```
<Badge
  variant="outline"
  color="secondary"
  withDot={true}
  dotColor="primary"
>
  {badgeText}
</Badge>
```

### Tabs

- No border radius
- Bottom border indicator for active state
- Hover state with semi-transparent background
- Consistent padding and spacing

### Cards

- No border radius
- Clean edges
- Content padding consistent with system

### Dividers

- Use borders instead of dedicated divider components
- `border-t`, `border-b`, `border-l`, `border-r`
- Color: `border-ca-700` or `border-primary`

### Icons

- **Icon Component:** Consistent icon system through the Icon component
- **Custom Platform Icons:** Specialized icon components for platforms
  (SlackIcon, TeamsIcon, DecoIcon)
- **Usage:** `<Icon id="IconName" size={24} className="text-amarelo" />`

### Specialized Components

#### PlatformTabs

- Tab-based interface to display platform integrations
- Features tab navigation with colored active indicators
- Consistent layout for platform description and benefits

#### VtexAgentChat

- Interactive chat interface for AI agent demos
- Message bubbles with varying states (user/AI)
- Support for text and list-based messages

#### SliderHero/Carousel

- Card-based slider/carousel for showcasing content
- Auto-sliding functionality
- Mobile-friendly navigation dots

## UI Patterns

### Backgrounds

- Decorative elements with rotation and positioning
- Semi-transparent gradients
- Z-index layering for depth

### Interactive Elements

- Simple hover states
- Active states with color indicators
- Clean transitions (`transition-all duration-300`)

### Accordions (FAQ)

```
<details class="border-primary border-b group">
  <summary class="text-lg cursor-pointer py-6 flex">
    <span class="flex-auto">{question.title}</span>
    <span class="flex-none transition group-open:rotate-180">
      {/* Icon */}
    </span>
  </summary>
  <p class="leading-relaxed mb-6 group-open:animate-fadeIn">
    {/* Content */}
  </p>
</details>
```

## Section Patterns

### Hero Sections

- Two-column layout on desktop, stacked on mobile
- Left: Text content with badge, title, description, and CTAs
- Right: Visual element (chat interface, image, slider)
- Background decorative elements positioned using negative margins and rotation

### Feature/Integration Sections

- Tabbed interfaces for content organization
- Clean separation with border dividers
- Consistent benefit lists with custom bullets

### FAQ Sections

- Accordion-based expandable content
- Simple open/close interactions
- Transition animations for elements

## Responsive Design

### Breakpoints

- Mobile: Default
- Small: `sm:` (640px)
- Medium: `md:` (768px)
- Large: `lg:` (1024px)

### Mobile-First Approach

- Stack elements vertically on mobile
- Two-column layouts on larger screens
- Adjusted font sizes and spacing per breakpoint

## Border Usage

### Key Characteristics

- **No border radius** on any UI element
- Borders for visual separation (`border-t`, `border-b`)
- Border colors: `border-ca-700`, `border-primary`
- Single pixel borders: `h-px bg-ca-700`

## Animation

- Subtle transitions: `transition-all duration-300`
- Accordion animation: `group-open:animate-fadeIn`
- Rotation animation: `group-open:rotate-180`

## Media

### Images

- `object-contain` for icons and logos
- `w-full h-auto` for responsive images
- Consistent aspect ratios

## Accessibility

- Proper ARIA attributes on interactive elements
- Sufficient color contrast
- Focus states for keyboard navigation
