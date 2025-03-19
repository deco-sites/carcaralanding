/**
 * Theme generator inspired by Daisy UI:
 * Copyright (c) 2020 Pouya Saadeghi
 * License: MIT (https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/LICENSE)
 * https://github.com/saadeghi/daisyui/blob/37bca23444bc9e4d304362c14b7088f9a08f1c74/src/docs/src/routes/theme-generator.svelte
 */
import SiteTheme, { Font as SiteFont } from "apps/website/components/Theme.tsx";
import Color from "npm:colorjs.io";
import type { ComponentChildren } from "preact";

// Extended Font interface for typography
export interface CarcaraFont extends SiteFont {
  /**
   * @title Font family
   * @description Font family for all text in the site
   */
  fontFamily?: string;
  /** @title Inter font URL */
  interUrl?: string;
  /** @title Instrument Serif font URL */
  instrumentSerifUrl?: string;
}

export interface Typography {
  /**
   * @title Hero Title
   * @description Serif, 72px, 100% line height, -1% letter spacing
   */
  heroTitle?: string;
  /**
   * @title Body
   * @description Sans, 16px, 150% line height, -2% letter spacing
   */
  body?: string;
  /**
   * @title Body Large
   * @description Sans, 20px, 150% line height, -2% letter spacing
   */
  bodyLarge?: string;
  /**
   * @title H1
   * @description Serif, 56px, 100% line-height, no letter spacing
   */
  h1?: string;
  /**
   * @title H2
   * @description Sans, 32px, 100% line-height, -4% letter spacing
   */
  h2?: string;
  /**
   * @title H3 Serif
   * @description Serif, 32px, 100% line-height, no letter spacing
   */
  h3Serif?: string;
  /**
   * @title H4
   * @description Sans, 20px, 120% line height, -3% letter spacing, font-medium
   */
  h4?: string;
  /**
   * @title Eyebrow
   * @description Sans, 14px, 120% line-height, 0 letter spacing
   */
  eyebrow?: string;
}

export interface ThemeColors {
  /**
   * @format color-input
   * @title Base
   */
  "base-100"?: string;
  /** @format color-input */
  "primary"?: string;
  /** @format color-input */
  "secondary"?: string;
  /**
   * @title Accent
   * @format color-input */
  "tertiary"?: string;
  /** @format color-input */
  "neutral"?: string;
  /** @format color-input */
  "success"?: string;
  /** @format color-input */
  "warning"?: string;
  /** @format color-input */
  "error"?: string;
  /** @format color-input */
  "info"?: string;

  // Carcará brand colors
  /** @format color-input */
  "ca-50"?: string;
  /** @format color-input */
  "ca-100"?: string;
  /** @format color-input */
  "ca-200"?: string;
  /** @format color-input */
  "ca-300"?: string;
  /** @format color-input */
  "ca-400"?: string;
  /** @format color-input */
  "ca-500"?: string;
  /** @format color-input */
  "ca-600"?: string;
  /** @format color-input */
  "ca-700"?: string;
  /** @format color-input */
  "ca-800"?: string;
  /** @format color-input */
  "ca-900"?: string;
  /** @format color-input */
  "amarelo"?: string;
  /** @format color-input */
  "vermelho"?: string;
  /** @format color-input */
  "verde"?: string;
  /** @format color-input */
  "azul"?: string;
  /** @format color-input */
  "cinza"?: string;
}

export interface ComplementaryColors {
  /** @format color-input */
  "base-200"?: string;
  /** @format color-input */
  "base-300"?: string;
  /** @format color-input */
  "base-content"?: string;
  /** @format color-input */
  "primary-content"?: string;
  /** @format color-input */
  "secondary-content"?: string;
  /**
   * @title Accent Content
   * @format color-input */
  "tertiary-content"?: string;
  /** @format color-input */
  "neutral-content"?: string;
  /** @format color-input */
  "success-content"?: string;
  /** @format color-input */
  "warning-content"?: string;
  /** @format color-input */
  "error-content"?: string;
  /** @format color-input */
  "info-content"?: string;
}

export interface Button {
  /**
   * @default 1px
   * @title Border width
   */
  "--border-btn": "1px" | "2px" | "3px" | "4px" | "5px" | "6px" | "7px" | "8px";
  /**
   * @default 0.2rem
   * @title Radius
   * @description Button and similar elements
   */
  "--rounded-btn": "0" | "0.2rem" | "0.4rem" | "0.8rem" | "2rem";
  /**
   * @default 0.95
   * @title Scale on click
   */
  "--btn-focus-scale": "0.9" | "0.95" | "1" | "1.05" | "1.1";
  /**
   * @default 0.25s
   * @title Animation
   * @description Duration when you click
   */
  "--animation-btn": "0.1s" | "0.15s" | "0.2s" | "0.25s" | "0.3s" | "0.35s";
}

export interface Miscellaneous {
  /**
   * @default 1rem
   * @title Rounded box
   * @description border radius rounded-box utility class, used in card and other large boxes
   */
  "--rounded-box": string;
  /**
   * @default 1.9rem
   * @title Rounded badge
   * @description border radius rounded-badge utility class, used in badges and similar
   */
  "--rounded-badge": string;
  /**
   * @default 0.2s
   * @title Animation input
   * @description duration of animation for inputs like checkbox, toggle, radio, etc
   */
  "--animation-input": string;
  /**
   * @default 1px
   * @title Tab border
   * @description border width of tabs
   */
  "--tab-border": string;
  /**
   * @default 0.5rem
   * @title Tab radius
   * @description border radius of tabs
   */
  "--tab-radius": string;
}

export interface Props {
  /**
   * @description Set the prefers-color-scheme media query. To support dark mode, create two instances of this block and set this option to light/dark in each instance
   */
  colorScheme: "any" | "light" | "dark";
  mainColors?: ThemeColors;
  /** @description These will be auto-generated to a readable color if not set */
  complementaryColors?: ComplementaryColors;
  buttonStyle?: Button;
  otherStyles?: Miscellaneous;
  font?: CarcaraFont;
  typography?: Typography;
  /**
   * @description This is the admin's color-scheme mode
   */
  mode?: "light" | "dark";
}

type Theme =
  & ThemeColors
  & ComplementaryColors
  & Button
  & Miscellaneous;

const darken = (color: string, percentage: number) =>
  new Color(color).darken(percentage);

const isDark = (c: Color) =>
  c.contrast("black", "WCAG21") < c.contrast("white", "WCAG21");

const contrasted = (color: string, percentage = 0.8) => {
  const c = new Color(color);

  return isDark(c) ? c.mix("white", percentage) : c.mix("black", percentage);
};

const toVariables = (
  t: Theme & Required<ThemeColors>,
): [string, string][] => {
  const toValue = (color: string | ReturnType<typeof darken>) => {
    const [l, c, h] = new Color(color).oklch;

    return `${(l * 100).toFixed(0)}% ${c.toFixed(2)} ${(h || 0).toFixed(0)}deg`;
  };

  const colorVariables = Object.entries({
    "--p": t["primary"],
    "--pc": t["primary-content"] ?? contrasted(t["primary"]),

    "--s": t["secondary"],
    "--sc": t["secondary-content"] ?? contrasted(t["secondary"]),

    "--a": t["tertiary"],
    "--ac": t["tertiary-content"] ?? contrasted(t["tertiary"]),

    "--n": t["neutral"],
    "--nc": t["neutral-content"] ?? contrasted(t["neutral"]),

    "--b1": t["base-100"],
    "--b2": t["base-200"] ?? darken(t["base-100"], 0.07),
    "--b3": t["base-300"] ?? darken(t["base-100"], 0.14),
    "--bc": t["base-content"] ?? contrasted(t["base-100"]),

    "--su": t["success"],
    "--suc": t["success-content"] ?? contrasted(t["success"]),

    "--wa": t["warning"],
    "--wac": t["warning-content"] ?? contrasted(t["warning"]),

    "--er": t["error"],
    "--erc": t["error-content"] ?? contrasted(t["error"]),

    "--in": t["info"],
    "--inc": t["info-content"] ?? contrasted(t["info"]),
  }).map(([key, color]) => [key, toValue(color)] as [string, string]);

  const miscellaneousVariables = Object.entries({
    "--rounded-box": t["--rounded-box"],
    "--rounded-btn": t["--rounded-btn"],
    "--rounded-badge": t["--rounded-badge"],
    "--animation-btn": t["--animation-btn"],
    "--animation-input": t["--animation-input"],
    "--btn-focus-scale": t["--btn-focus-scale"],
    "--border-btn": t["--border-btn"],
    "--tab-border": t["--tab-border"],
    "--tab-radius": t["--tab-radius"],
  });

  return [...colorVariables, ...miscellaneousVariables];
};

const defaultTheme = {
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

  "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
  "--rounded-btn": "0.2rem" as const, // border radius rounded-btn utility class, used in buttons and similar element
  "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
  "--animation-btn": "0.25s" as const, // duration of animation when you click on button
  "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
  "--btn-focus-scale": "0.95" as const, // scale transform of button when you focus on it
  "--border-btn": "1px" as const, // border width of buttons
  "--tab-border": "1px", // border width of tabs
  "--tab-radius": "0.5rem", // border radius of tabs
};

/**
 * This section merges the DESIGN_SYTEM variable with incoming props into a css sheet with variables, i.e.
 * this function transforms props into
 *
 * :root {
 *   --color-primary: #FFFFFF;
 *   --color-secondary: "#161616"
 * }
 */
function Section({
  mainColors,
  complementaryColors,
  buttonStyle,
  otherStyles,
  font,
  typography,
  colorScheme,
}: Props) {
  const theme = {
    ...defaultTheme,
    ...complementaryColors,
    ...mainColors,
    ...buttonStyle,
    ...otherStyles,
  };

  const variables = [
    ...toVariables(theme),
    [
      "--font-family",
      font?.fontFamily ||
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    ],
  ]
    .map(([name, value]) => ({ name, value }));

  // Add typography variables
  const typographyVariables = typography
    ? {
      "--hero-title": typography.heroTitle ||
        "font-serif text-[72px] leading-[100%] tracking-[-1%]",
      "--body": typography.body ||
        "font-sans text-[16px] leading-[150%] tracking-[-2%]",
      "--body-large": typography.bodyLarge ||
        "font-sans text-[20px] leading-[150%] tracking-[-2%]",
      "--h1": typography.h1 ||
        "font-serif text-[56px] leading-[100%]",
      "--h2": typography.h2 ||
        "font-sans text-[32px] leading-[100%] tracking-[-4%]",
      "--h3-serif": typography.h3Serif ||
        "font-serif text-[32px] leading-[100%]",
      "--h4": typography.h4 ||
        "font-sans text-[20px] leading-[120%] tracking-[-3%] font-medium",
      "--eyebrow": typography.eyebrow ||
        "font-sans text-[14px] leading-[120%]",
    }
    : {};

  // Font import
  const interUrl = font?.interUrl ||
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
  const instrumentSerifUrl = font?.instrumentSerifUrl ||
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;700&display=swap";

  // Add styles for typography classes
  const typographyStyles = `
    @import url('${interUrl}');
    @import url('${instrumentSerifUrl}');
    
    :root {
      --font-family: ${
    font?.fontFamily || "'Inter', 'Instrument Serif', sans-serif"
  };
    }
    
    .font-sans {
      font-family: 'Inter', sans-serif;
    }
    
    .font-serif {
      font-family: 'Instrument Serif', serif;
    }
    
    .hero-title {
      font-family: 'Instrument Serif', serif;
      font-size: 72px;
      line-height: 100%;
      letter-spacing: -1%;
    }
    
    .body {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: -2%;
    }
    
    .body-large {
      font-family: 'Inter', sans-serif;
      font-size: 20px;
      line-height: 150%;
      letter-spacing: -2%;
    }
    
    .h1 {
      font-family: 'Instrument Serif', serif;
      font-size: 56px;
      line-height: 100%;
    }
    
    .h2 {
      font-family: 'Inter', sans-serif;
      font-size: 32px;
      line-height: 100%;
      letter-spacing: -4%;
    }
    
    .h3-serif {
      font-family: 'Instrument Serif', serif;
      font-size: 32px;
      line-height: 100%;
    }
    
    .h4 {
      font-family: 'Inter', sans-serif;
      font-size: 20px;
      line-height: 120%;
      letter-spacing: -3%;
      font-weight: 500;
    }
    
    .eyebrow {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 120%;
    }
  `;

  return (
    <SiteTheme
      fonts={font ? [font] : undefined}
      variables={variables}
      colorScheme={colorScheme === "any" ? undefined : colorScheme}
    />
  );
}

export function Preview(props: Props) {
  const adminColorMode = props.mode === "dark" ? "dark" : "light";
  return (
    <>
      {
        /* This stylesheet is used to simulate the colors from the admin's color schema (admin's light or dark mode), which are not accessible in the site's color schema.
        * This is a temporary solution until the admin's color schema is accessible.
        * TODO(@carol): Change this temporary solution / discuss with designers a doable approach
       */
      }
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&display=swap');

          :root {
            --admin-color-dark-bg: #0d1717;
            --admin-color-light-bg: #ffffff;
            --admin-text-color-dark: #e4e7e7;
            --admin-text-color-light: #162222;
            --admin-border-color-light: #c9cfcf;
            --admin-border-color-dark: #2f3c3c;
            --admin-border-hover-color-light: #819292;
            --admin-border-hover-color-dark: #949e9e;
            --admin-hover-bg-color: #fafafa;
            --admin-font-family: 'Albert Sans', sans-serif;
          }

          .admin-font-family {
            font-family: var(--admin-font-family);
          }

          .dark {
            background-color: var(--admin-color-dark-bg);
            color: var(--admin-text-color-dark);
          }

          .light {
            background-color: var(--admin-color-light-bg);
            color: var(--admin-text-color-light);
          }

          .btn-outline-light, .btn-outline-dark {
            background-color: transparent;
            display: inline-flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border: 1px solid;
            border-radius: 0.5rem;
          }

          .btn-outline-light {
            color: var(--admin-text-color-light);
            border-color: var(--admin-border-color-light);
          }

          .btn-outline-dark {
            color: var(--admin-text-color-dark);
            border-color: var(--admin-border-color-dark);
          }

          .btn-outline-light:hover, .btn-outline-dark:hover {
            background-color: transparent);
            display: inline-flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            white-space: nowrap;
            border-radius: 0.5rem;
          }

          .btn-outline-light:hover {
            border-color: var(--admin-border-hover-color-light);
          }

          .btn-outline-dark:hover {
            border-color: var(--admin-border-hover-color-dark);
          }

          .border-color-dark {
            border-color: var(--admin-border-color-dark);
          }

          .border-color-light {
            border-color: var(--admin-border-color-light);
          }
        `}
      </style>
      <Section {...props} />
      <div
        className={`flex flex-col gap-2 p-1 text-base w-full ${adminColorMode}`}
      >
        <div className="admin-font-family">
          Components and styles
        </div>
        <div className="flex flex-col w-full gap-2">
          <PreviewContainer
            title="Text colors"
            mode={adminColorMode}
            codeString={snippets.textColors}
          >
            <TextColorsPreview />
          </PreviewContainer>
          <PreviewContainer
            title="Button styles"
            mode={adminColorMode}
            codeString={snippets.buttonStyles}
          >
            <ButtonStylesPreview />
          </PreviewContainer>
          <PreviewContainer
            title="Button colors"
            mode={adminColorMode}
            codeString={snippets.buttonColors}
          >
            <ButtonColorsPreview />
          </PreviewContainer>
          <PreviewContainer
            title="Button sizes"
            mode={adminColorMode}
            codeString={snippets.buttonSizes}
          >
            <ButtonSizesPreview />
          </PreviewContainer>
        </div>
      </div>
      {props.font?.fontFamily && (
        <div className="text-center py-2">
          Font: {props.font.fontFamily}
        </div>
      )}
    </>
  );
}

const ButtonSizesPreview = () => {
  const buttonSizes = {
    lg: "Large",
    md: "Normal",
    sm: "Small",
    xs: "Tiny",
  };

  const buttonStyles = ["", "primary", "secondary", "accent"];

  const renderButtonRow = (style: string) => (
    <div className="flex flex-row gap-2 items-center">
      {Object.entries(buttonSizes).map(([sizeCode, sizeText]) => (
        <button
          className={`btn capitalize btn-${sizeCode} ${
            style ? `btn-${style}` : ""
          }`}
        >
          {sizeText}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-base-100 overflow-x-auto rounded-lg flex flex-col p-2 gap-2">
      {buttonStyles.map((style) => renderButtonRow(style))}
    </div>
  );
};

const ButtonColorsPreview = () => {
  const buttonTypesClasses = ["btn", "btn-outline", "btn-ghost", "btn-link"];
  const buttonColorsClasses = [
    { class: "", label: "Button" },
    { class: "btn-primary", label: "Primary" },
    { class: "btn-secondary", label: "Secondary" },
    { class: "btn-accent", label: "Accent" },
  ];

  const renderButtonRow = (type: string) => (
    <div className="flex flex-row gap-2">
      {buttonColorsClasses.map(({ class: colorClass, label }) => (
        <button
          className={`btn btn-xs md:btn-sm capitalize ${colorClass} ${type} ${
            type === "btn-ghost" ? "text-[initial]" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-base-100 overflow-x-auto rounded-lg flex flex-col p-2 gap-2">
      {buttonTypesClasses.map((type) => renderButtonRow(type))}
    </div>
  );
};

const ButtonStylesPreview = () => {
  const buttons = [
    { class: "btn", label: "Button" },
    { class: "btn-outline", label: "Outline" },
    { class: "btn-ghost text-[initial]", label: "Ghost" },
    { class: "btn-link", label: "Link" },
  ];

  return (
    <div className="bg-base-100 overflow-x-auto rounded-lg flex flex-row p-2 gap-2">
      {buttons.map((button) => (
        <button className={`btn btn-xs md:btn-sm capitalize ${button.class}`}>
          {button.label}
        </button>
      ))}
    </div>
  );
};

const TextColorsPreview = () => {
  const textColorsClasses = [
    "text-[initial]",
    "text-primary",
    "text-secondary",
    "text-accent",
  ];

  return (
    <div className="bg-base-100 overflow-x-auto rounded-lg flex flex-row p-2 gap-2 text-sm md:text-base">
      {textColorsClasses.map((color, index) => (
        <div className={`${color} capitalize`}>
          {index === 0 ? "Content" : color.split("-")[1]}
        </div>
      ))}
    </div>
  );
};

const PreviewContainer = (
  { mode, title, children, codeString }: {
    mode: string;
    title: string;
    children: ComponentChildren;
    codeString: string;
  },
) => {
  const borderClass = mode === "dark"
    ? "border-color-dark"
    : "border-color-light";
  const btnOutlineClass = mode === "dark"
    ? "btn-outline-dark"
    : "btn-outline-light";
  const checkboxId = `show-code-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const codeBlockId = `code-block-${title.replace(/\s+/g, "-").toLowerCase()}`;

  // Dynamic styles added to hide/show labels based on the checkbox state
  const dynamicStyle = `
    #${codeBlockId} {
      display: none;
    }
    #${checkboxId}:checked ~ #${codeBlockId} {
      display: block;
    }
    #${checkboxId}:checked ~ .show-label {
      display: none;
    }
    #${checkboxId}:not(:checked) ~ .hide-label {
      display: none;
    }
    #${checkboxId}:checked ~ .hide-label {
      background-color: ${
    mode === "dark"
      ? "var(--admin-hover-bg-color)"
      : "var(--admin-text-color-light)"
  };
      color: ${
    mode === "dark"
      ? "var(--admin-text-color-light)"
      : "var(--admin-hover-bg-color)"
  };
    }
  `;

  return (
    <>
      <style>{dynamicStyle}</style>
      <div
        className={`border p-4 flex flex-col gap-2 grow relative ${borderClass} rounded-lg`}
      >
        <div className="admin-font-family">
          <div className="my-1">{title}</div>
          <div>
            <input type="checkbox" id={checkboxId} className="sr-only" />
            {/* Label for "Show code" */}
            <label
              htmlFor={checkboxId}
              className={`btn-sm absolute right-4 top-4 ${btnOutlineClass} show-label`}
            >
              Show code
            </label>
            {/* Label for "Hide code" */}
            <label
              htmlFor={checkboxId}
              className={`btn-sm absolute right-4 top-4 ${btnOutlineClass} hide-label`}
            >
              Hide code
            </label>
            <div
              id={codeBlockId}
              className={`mt-4 mb-2 text-xs md:text-sm ${
                mode === "dark" ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              <pre className="p-4 overflow-x-auto">{codeString}</pre>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

// TODO(@carol): find a way to make these snippets more dynamic
const snippets = {
  textColors: `
  <div>Content</div>
  <div class="text-primary">Primary</div>
  <div class="text-secondary">Secondary</div>
  <div class="text-accent">Accent</div>`,
  buttonStyles: `
  <button class="btn btn-sm">Button</button>
  <button class="btn btn-sm btn-outline">Outline</button>
  <button class="btn btn-sm btn-ghost">Ghost</button>
  <button class="btn btn-sm btn-link">Link</button>`,
  buttonColors: `
  {/* First row */}
  <button class="btn btn-sm">Button</button>
  <button class="btn btn-sm btn-primary">Primary</button>
  <button class="btn btn-sm btn-secondary">Secondary</button>
  <button class="btn btn-sm btn-accent">Accent</button>

  {/* Second row */}
  <button class="btn btn-sm btn-outline">Button</button>
  <button class="btn btn-sm btn-primary btn-outline">Primary</button>
  <button class="btn btn-sm btn-secondary btn-outline">Secondary</button>
  <button class="btn btn-sm btn-accent btn-outline">Accent</button>

  {/* Third row */}
  <button class="btn btn-sm btn-ghost">Button</button>
  <button class="btn btn-sm btn-primary btn-ghost">Primary</button>
  <button class="btn btn-sm btn-secondary btn-ghost">Secondary</button>
  <button class="btn btn-sm btn-accent btn-ghost">Accent</button>

  {/* Fourth row */}
  <button class="btn btn-sm btn-link">Button</button>
  <button class="btn btn-sm btn-primary btn-link">Primary</button>
  <button class="btn btn-sm btn-secondary btn-link">Secondary</button>
  <button class="btn btn-sm btn-accent btn-link">Accent</button>`,
  buttonSizes: `
  {/* First row */}
  <button class="btn btn-lg">Large</button>
  <button class="btn btn-md">Normal</button>
  <button class="btn btn-sm">Small</button>
  <button class="btn btn-xs">Tiny</button>

  {/* Second row */}
  <button class="btn btn-lg btn-primary">Large</button>
  <button class="btn btn-md btn-primary">Normal</button>
  <button class="btn btn-sm btn-primary">Small</button>
  <button class="btn btn-xs btn-primary">Tiny</button>

  {/* Third row */}
  <button class="btn btn-lg btn-secondary">Large</button>
  <button class="btn btn-md btn-secondary">Normal</button>
  <button class="btn btn-sm btn-secondary">Small</button>
  <button class="btn btn-xs btn-secondary">Tiny</button>
  
  {/* Fourth row */}
  <button class="btn btn-lg btn-accent">Large</button>
  <button class="btn btn-md btn-accent">Normal</button>
  <button class="btn btn-sm btn-accent">Small</button>
  <button class="btn btn-xs btn-accent">Tiny</button>`,
};

export default Section;
