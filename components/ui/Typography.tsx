import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";

export interface TypographyProps {
  class?: string;
  children: ComponentChildren;
}

export function HeroTitle(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLHeadingElement>
    & TypographyProps,
) {
  return (
    <h1
      class={`hero-title font-serif text-8xl leading-[1.1] tracking-[-0.01em] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Body(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLParagraphElement>
    & TypographyProps,
) {
  return (
    <p
      class={`body font-sans text-base leading-[1.5] tracking-[-0.02em] ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function BodyLarge(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLParagraphElement>
    & TypographyProps,
) {
  return (
    <p
      class={`body-large font-sans text-xl leading-[1.5] tracking-[-0.02em] ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function H1(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLHeadingElement>
    & TypographyProps,
) {
  return (
    <h1
      class={`h1 font-serif text-6xl leading-[1.1] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLHeadingElement>
    & TypographyProps,
) {
  return (
    <h2
      class={`h2 font-sans text-3xl leading-[1.1] tracking-[-0.04em] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3Serif(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLHeadingElement>
    & TypographyProps,
) {
  return (
    <h3
      class={`h3-serif font-serif text-3xl leading-[1.1] ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLHeadingElement>
    & TypographyProps,
) {
  return (
    <h4
      class={`h4 font-sans text-xl leading-[1.1] tracking-[-0.03em] font-medium ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}

export function Eyebrow(
  { class: className = "", children, ...props }:
    & JSX.HTMLAttributes<HTMLSpanElement>
    & TypographyProps,
) {
  return (
    <span
      class={`eyebrow font-sans text-sm leading-[1.2] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default {
  HeroTitle,
  Body,
  BodyLarge,
  H1,
  H2,
  H3Serif,
  H4,
  Eyebrow,
};
