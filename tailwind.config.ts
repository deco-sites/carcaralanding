import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      // Carcará brand colors
      colors: {
        "ca": {
          50: "#E2E2DA",
          100: "#D9D9D1",
          200: "#C7C8C1",
          300: "#ADAEA9",
          400: "#8B8D8A",
          500: "#727472",
          600: "#555758",
          700: "#3E4042",
          800: "#282B2E",
          900: "#1B1D1E",
        },
        "amarelo": "#CC8B43",
        "vermelho": "#B13431",
        "verde": "#557247",
        "azul": "#4C7780",
        "cinza": "#607A7E",
      },
      // Custom typography styles
      fontSize: {
        "hero": ["72px", {
          lineHeight: "100%",
          letterSpacing: "-1%",
        }],
        "body": ["16px", {
          lineHeight: "150%",
          letterSpacing: "-2%",
        }],
        "body-lg": ["20px", {
          lineHeight: "150%",
          letterSpacing: "-2%",
        }],
        "h1": ["56px", {
          lineHeight: "100%",
        }],
        "h2": ["32px", {
          lineHeight: "100%",
          letterSpacing: "-4%",
        }],
        "h3": ["32px", {
          lineHeight: "100%",
        }],
        "h4": ["20px", {
          lineHeight: "120%",
          letterSpacing: "-3%",
          fontWeight: "500",
        }],
        "eyebrow": ["14px", {
          lineHeight: "120%",
        }],
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "serif": ["Instrument Serif", "serif"],
      },
      animation: {
        sliding: "sliding 30s linear infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        progress: "progress 5s linear",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
};
