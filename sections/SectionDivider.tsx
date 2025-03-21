import { ContentContainer } from "../components/Layout.tsx";

/**
 * @title Section Divider
 * @description A horizontal line separator between page sections
 */
export interface SectionDividerProps {
  /**
   * @title Padding Top
   * @description Space above the divider line
   * @default 4rem
   */
  paddingTop?: string;

  /**
   * @title Padding Bottom
   * @description Space below the divider line
   * @default 4rem
   */
  paddingBottom?: string;

  /**
   * @title Color
   * @description Theme color name for the divider
   * @default ca-700
   */
  color?: string;

  /**
   * @title Width
   * @description Thickness of the divider line
   * @default 1px
   */
  width?: string;

  /**
   * @title Opacity
   * @description Transparency of the divider line (0-100)
   * @default 20
   */
  opacity?: number;

  /**
   * @title Full Height
   * @description Whether the divider should take the full viewport height
   * @default false
   */
  fullHeight?: boolean;

  /**
   * @title Additional Classes
   * @description Extra CSS classes to apply
   * @default ""
   */
  className?: string;
}

/**
 * A horizontal divider line that sits between sections
 * Follows the content width constraints and has configurable padding
 */
export default function SectionDivider({
  paddingTop = "4rem",
  paddingBottom = "4rem",
  color = "ca-700",
  width = "1px",
  opacity = 20,
  fullHeight = false,
  className = "",
}: SectionDividerProps) {
  return (
    <div
      className={`w-full ${fullHeight ? "h-screen" : ""} ${className}`}
      style={{
        paddingTop,
        paddingBottom,
      }}
    >
      <ContentContainer
        className={`${fullHeight ? "h-full flex items-center" : ""}`}
      >
        <div
          className="w-full"
          style={{
            height: fullHeight ? "100%" : width,
            backgroundColor: `var(--${color})`,
            opacity: opacity / 100,
          }}
        />
      </ContentContainer>
    </div>
  );
}
