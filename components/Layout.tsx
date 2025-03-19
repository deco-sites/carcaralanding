import { ComponentChildren } from "preact";

export interface LayoutProps {
  /**
   * The content to display inside the layout
   */
  children: ComponentChildren;

  /**
   * Additional classes to apply to the layout container
   */
  className?: string;
}

/**
 * Layout component that wraps page content
 * Each section maintains its full width for backgrounds, while its content
 * is constrained to maxWidth (1440px) via ContentContainer
 */
export default function Layout({
  children,
  className = "",
}: LayoutProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main content */}
      {children}
    </div>
  );
}

/**
 * A wrapper for individual sections to provide consistent content width
 */
export function ContentContainer({
  children,
  className = "",
}: {
  children: ComponentChildren;
  className?: string;
}) {
  return (
    <div className={`content-container ${className}`}>
      {children}
    </div>
  );
}
