import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";
import { Eyebrow } from "./Typography.tsx";

export type BadgeVariant = "default" | "outline" | "filled";
export type BadgeColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /**
   * The content to display inside the badge
   */
  children: ComponentChildren;

  /**
   * The visual style of the badge
   * @default "outline"
   */
  variant?: BadgeVariant;

  /**
   * The color scheme of the badge
   * @default "primary"
   */
  color?: BadgeColor;

  /**
   * The size of the badge
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Whether to include an indicator dot
   * @default false
   */
  withDot?: boolean;

  /**
   * Color for the dot (can be different from badge color)
   * @default "primary"
   */
  dotColor?: BadgeColor;

  /**
   * Additional CSS classes to apply to the badge
   */
  class?: string;

  /**
   * Additional props to pass to the div element
   */
  [key: string]: any;
}

/**
 * Badge component for displaying short status descriptors
 */
export default function Badge({
  children,
  variant = "outline",
  color = "secondary",
  size = "md",
  withDot = false,
  dotColor = "primary",
  class: className = "",
  ...props
}: BadgeProps) {
  // Base classes for all badge variants
  const baseClasses = "inline-flex items-center justify-center rounded-full";

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-3 py-2 text-sm",
  };

  // Color classes for the badge based on variant
  const colorClasses = {
    default: {
      primary: "bg-amarelo/10 text-amarelo",
      secondary: "bg-ca-700/10 text-ca-300",
      info: "bg-azul/10 text-azul",
      success: "bg-verde/10 text-verde",
      warning: "bg-amarelo/10 text-amarelo",
      error: "bg-vermelho/10 text-vermelho",
      neutral: "bg-ca-500/10 text-ca-300",
    },
    outline: {
      primary: "border border-amarelo text-ca-300",
      secondary: "border border-ca-700 text-ca-300",
      info: "border border-azul text-ca-300",
      success: "border border-verde text-ca-300",
      warning: "border border-amarelo text-ca-300",
      error: "border border-vermelho text-ca-300",
      neutral: "border border-ca-500 text-ca-300",
    },
    filled: {
      primary: "bg-amarelo text-zinc-900",
      secondary: "bg-ca-700 text-ca-50",
      info: "bg-azul text-ca-50",
      success: "bg-verde text-ca-50",
      warning: "bg-amarelo text-zinc-900",
      error: "bg-vermelho text-ca-50",
      neutral: "bg-ca-500 text-ca-50",
    },
  };

  // Dot color classes - separate from badge color
  const dotColorClasses = {
    primary: "bg-amarelo",
    secondary: "bg-ca-700",
    info: "bg-azul",
    success: "bg-verde",
    warning: "bg-amarelo",
    error: "bg-vermelho",
    neutral: "bg-ca-500",
  };

  // Generate the composite class
  const classes = [
    baseClasses,
    sizeClasses[size],
    colorClasses[variant][color],
    className,
  ].join(" ");

  // Filter out our custom props from being passed to the DOM element
  const {
    variant: _,
    color: __,
    size: ___,
    withDot: ____,
    dotColor: _____,
    ...domProps
  } = props;

  return (
    <div class={classes} {...domProps}>
      {withDot && (
        <div class={`w-2 h-2 rounded-full mr-2 ${dotColorClasses[dotColor]}`}>
        </div>
      )}
      <Eyebrow>
        {children}
      </Eyebrow>
    </div>
  );
}
