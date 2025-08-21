### Theme (Design System Variables)

Generates CSS variables and typography classes for the site.

#### Import
```tsx
import Theme, { Preview, type Props as ThemeProps } from "../../sections/Theme/Theme.tsx";
```

#### ThemeProps (key fields)
- colorScheme: "any" | "light" | "dark"
- mainColors?: ThemeColors (primary, secondary, tertiary, neutral, base-100, info, success, warning, error)
- complementaryColors?: ComplementaryColors (auto-generated if omitted)
- buttonStyle?: Button (CSS variable controls)
- otherStyles?: Miscellaneous (rounded, tab styles, etc.)
- font?: CarcaraFont (fontFamily, interUrl, instrumentSerifUrl)
- typography?: Typography (heroTitle, body, bodyLarge, h1, h2, h3Serif, h4, eyebrow)

#### Usage
```tsx
<Theme
  colorScheme="any"
  mainColors={{ primary: "#E2E2DA", secondary: "#3E4042", tertiary: "#CC8B43", neutral: "#727472", "base-100": "#FFFFFF" }}
  typography={{ h1: "font-serif text-[56px]" }}
/>
```

#### Preview
```tsx
<Preview mode="dark" colorScheme="dark" />
```