import type { ComponentChildren } from "preact";

export interface Font {
  /**
   * @title Font family
   * @description Font family for all text in the site
   */
  family: string;
  /**
   * @title Style sheet
   * @description URL to the font style sheet
   */
  styleSheet: string;
}

interface Props {
  fonts?: Font[];
  variables?: Array<{ name: string; value: string }>;
  colorScheme?: "light" | "dark";
  children?: ComponentChildren;
}

/**
 * Implements global theme for a deco.cx site.
 * Removes all default style from elements like <button>, <hr>, <a>, <ul> etc.
 * Recommended usage is in conjunction with tailwind
 */
function Theme({ fonts = [], variables = [], colorScheme }: Props) {
  const mediaQuery = colorScheme
    ? `:root[data-color-scheme="${colorScheme}"], ${
      colorScheme === "dark" ? ":root.dark" : ":root:not(.dark)"
    }`
    : ":root";

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          ${mediaQuery} {
            ${
          variables.map(({ name, value }) => `${name}: ${value};`).join("\n")
        }
          }

          ${
          fonts?.map((font) => `
              @font-face {
                font-family: ${font.family};
                src: url(${font.styleSheet});
                font-display: swap;
              }
            `)
        }
        `,
      }}
    />
  );
}

export default Theme;
