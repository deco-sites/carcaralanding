import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps {
  /**
   * The content to display inside the button
   */
  children: ComponentChildren;

  /**
   * The variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * The href for the button (renders as anchor if provided)
   */
  href?: string;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes to apply to the button
   */
  class?: string;

  /**
   * The type of the button (ignored if href is provided)
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Target for the anchor tag (only used if href is provided)
   * @default "_self"
   */
  target?: string;

  /**
   * Aria-label for the button
   */
  "aria-label"?: string;

  /**
   * onClick handler for the button
   */
  onClick?: JSX.MouseEventHandler<HTMLElement>;
}

/**
 * Button component for consistent button styling throughout the application
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  class: className = "",
  type = "button",
  target,
  "aria-label": ariaLabel,
  onClick,
  ...props
}: ButtonProps) {
  // Base classes for all button variants
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all";

  // Size classes
  const sizeClasses = {
    xs: "text-xs px-2.5 py-1 min-h-8",
    sm: "text-sm px-4 py-1.5 min-h-9",
    md: "text-base px-5 py-2 min-h-10",
    lg: "text-lg px-6 py-2.5 min-h-12",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-amarelo text-zinc-900 hover:bg-amber-500 active:bg-amber-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amarelo",
    secondary:
      "bg-ca-700 text-ca-50 hover:bg-ca-600 active:bg-ca-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ca-700",
    outline:
      "bg-transparent border border-ca-700 text-ca-50 hover:bg-ca-800 active:bg-ca-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ca-700",
    ghost:
      "bg-transparent text-ca-50 hover:bg-ca-800/50 active:bg-ca-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ca-700",
    link:
      "bg-transparent text-amarelo underline-offset-4 hover:underline active:text-amber-600 focus-visible:ring-0",
  };

  // Disabled classes
  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  // Combine all classes
  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabled ? disabledClasses : "",
    className,
  ].join(" ");

  // Common props for both button and anchor
  const commonProps = {
    class: classes,
    "aria-label": ariaLabel,
    onClick,
    ...props,
  };

  // If href is provided, render as an anchor tag
  if (href && !disabled) {
    return (
      // @ts-ignore - TypeScript doesn't like the mix of button and anchor props
      <a
        href={href}
        target={target}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  // Otherwise, render as a button
  return (
    // @ts-ignore - TypeScript doesn't like the mix of button and anchor props
    <button
      type={type}
      disabled={disabled}
      {...commonProps}
    >
      {children}
    </button>
  );
}
