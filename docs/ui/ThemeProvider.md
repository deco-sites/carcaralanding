### ThemeProvider

Provides theme variables, color scheme, and font configuration.

#### Import
```tsx
import ThemeProvider from "../../components/ui/ThemeProvider.tsx";
```

#### Props
- colorScheme: "any" | "light" | "dark" (default: "any")
- children: ComponentChildren

#### Context
`ThemeContext` value:
- colorScheme: "any" | "light" | "dark"
- isDark: boolean
- toggleTheme: () => void

#### Usage
```tsx
<ThemeProvider colorScheme="any">
  <App />
</ThemeProvider>
```