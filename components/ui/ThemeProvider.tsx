import { ComponentChildren } from "preact";
import { createContext } from "preact";
import Theme from "../../sections/Theme/Theme.tsx";
import { Typography } from "../../sections/Theme/Theme.tsx";

export interface ThemeProviderProps {
  children: ComponentChildren;
  colorScheme?: "any" | "light" | "dark";
}

export const ThemeContext = createContext<{
  colorScheme: "any" | "light" | "dark";
  isDark: boolean;
  toggleTheme: () => void;
}>({
  colorScheme: "any",
  isDark: false,
  toggleTheme: () => {},
});

export default function ThemeProvider({
  children,
  colorScheme = "any",
}: ThemeProviderProps) {
  // Default dark mode based on user's system preference
  const prefersDarkMode = typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;

  // Initial dark mode state
  let isDark = prefersDarkMode;

  // Function to toggle dark mode
  const toggleTheme = () => {
    isDark = !isDark;
    document.documentElement.classList.toggle("dark", isDark);
  };

  // Define Carcará theme colors
  const mainColors = {
    "primary": "#E2E2DA", // ca-50 as primary
    "secondary": "#3E4042", // ca-700 as secondary
    "tertiary": "#CC8B43", // amarelo as accent
    "neutral": "#727472", // ca-500 as neutral
    "base-100": "#FFFFFF", // white
    "info": "#4C7780", // azul as info
    "success": "#B13431", // verde
    "warning": "#CC8B43", // amarelo as warning
    "error": "#B13431", // vermelho as error

    // Carcará brand colors
    "ca-50": "#E2E2DA",
    "ca-100": "#D9D9D1",
    "ca-200": "#C7C8C1",
    "ca-300": "#ADAEA9",
    "ca-400": "#8B8D8A",
    "ca-500": "#727472",
    "ca-600": "#555758",
    "ca-700": "#3E4042",
    "ca-800": "#282B2E",
    "ca-900": "#1B1D1E",
    "amarelo": "#CC8B43",
    "vermelho": "#B13431",
    "verde": "#B13431",
    "azul": "#4C7780",
    "cinza": "#607A7E",
  };

  const typography = {
    heroTitle: "font-serif text-[72px] leading-[100%] tracking-[-0.01em]",
    body: "font-sans text-[16px] leading-[150%] tracking-[-0.02em]",
    bodyLarge: "font-sans text-[20px] leading-[150%] tracking-[-0.02em]",
    h1: "font-serif text-[56px] leading-[100%]",
    h2: "font-sans text-[32px] leading-[100%] tracking-[-0.04em]",
    h3Serif: "font-serif text-[32px] leading-[100%]",
    h4: "font-sans text-[20px] leading-[120%] tracking-[-0.03em] font-medium",
    eyebrow: "font-sans text-[14px] leading-[120%]",
  };

  // Font configuration
  const font = {
    family: "'Inter', 'Instrument Serif', sans-serif",
    fontFamily: "'Inter', 'Instrument Serif', sans-serif",
    styleSheet:
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:wght@400;700&display=swap",
    interUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    instrumentSerifUrl:
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;700&display=swap",
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, isDark, toggleTheme }}>
      <Theme
        colorScheme={colorScheme}
        mainColors={mainColors}
        font={font}
        typography={typography}
      />
      {children}
    </ThemeContext.Provider>
  );
}
