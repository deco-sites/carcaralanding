import { JSX } from "preact";
import { Animation, AnimationProps } from "../components/ui/Animation.tsx";

/**
 * Default animation configurations for different section elements
 */
export const sectionAnimations = {
  // Main section container
  container: {
    type: "fade-in",
    duration: 0.5,
    threshold: 0.1,
  } as Partial<AnimationProps>,

  // Section headers (title, subtitle, etc.)
  header: {
    type: "mask-up",
    duration: 0.8,
    delay: 0.1,
    staggerDelay: 0.1,
  } as Partial<AnimationProps>,

  // Content blocks within sections
  content: {
    type: "fade-in",
    duration: 0.6,
    delay: 0.3,
    staggerChildren: true,
    staggerDelay: 0.1,
  } as Partial<AnimationProps>,

  // Images or media
  media: {
    type: "slide-up",
    duration: 0.7,
    delay: 0.2,
    threshold: 0.1,
  } as Partial<AnimationProps>,

  // Cards or individual items in a grid
  cards: {
    type: "fade-in",
    duration: 0.5,
    staggerChildren: true,
    staggerDelay: 0.1,
  } as Partial<AnimationProps>,

  // Elements that appear from left
  fromLeft: {
    type: "slide-in-left",
    duration: 0.6,
    delay: 0.2,
  } as Partial<AnimationProps>,

  // Elements that appear from right
  fromRight: {
    type: "slide-in-right",
    duration: 0.6,
    delay: 0.2,
  } as Partial<AnimationProps>,

  // CTA or call-to-action elements
  cta: {
    type: "scale-in",
    duration: 0.5,
    delay: 0.4,
  } as Partial<AnimationProps>,
};

/**
 * A helper function to easily apply animations to a section
 * @param element The JSX element to animate
 * @param animationConfig Animation configuration for the element
 * @param customProps Any additional props to override the defaults
 */
export function animateElement(
  element: JSX.Element,
  animationConfig: Partial<AnimationProps> = sectionAnimations.container,
  customProps: Partial<AnimationProps> = {},
): JSX.Element {
  return (
    <Animation
      {...animationConfig}
      {...customProps}
    >
      {element}
    </Animation>
  );
}

/**
 * A higher-order component that wraps entire sections with animation
 * @param SectionComponent The section component to animate
 * @param animationConfig Default animation config for the section
 */
export function withSectionAnimation<T extends Record<string, unknown>>(
  SectionComponent: (props: T) => JSX.Element,
  animationConfig: Partial<AnimationProps> = sectionAnimations.container,
) {
  return (props: T & { animationProps?: Partial<AnimationProps> }) => {
    const { animationProps, ...sectionProps } = props;

    return (
      <Animation
        {...animationConfig}
        {...animationProps}
      >
        <SectionComponent {...sectionProps as unknown as T} />
      </Animation>
    );
  };
}
