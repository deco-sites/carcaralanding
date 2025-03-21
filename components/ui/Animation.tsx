import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact";
import { animate, inView, stagger } from "npm:@motionone/dom@10.18.0";

// Animation types that we support
export type AnimationType =
  | "fade-in"
  | "slide-up"
  | "slide-in-left"
  | "slide-in-right"
  | "scale-in"
  | "mask-up"
  | "none";

// Configuration options for animations
export interface AnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  class?: string;
  style?: JSX.CSSProperties;
  children: JSX.Element | JSX.Element[] | string;
}

/**
 * Animation component that wraps content with scroll-triggered animations
 */
export function Animation({
  type = "fade-in",
  duration = 0.5,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.2,
  rootMargin = "0px 0px -100px 0px",
  once = true,
  class: className = "",
  style = {},
  children,
}: AnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // For mask-up animation, we need to split text into lines and wrap them
    if (type === "mask-up" && !hasAnimated) {
      const element = ref.current;
      const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");

      headings.forEach((heading) => {
        // Split text by line break
        const lines = heading.innerHTML.split("<br>");
        const wrappedLines = lines.map((line) =>
          `<span class="mask-up-line" style="display: block; overflow: hidden;">
            <span class="mask-up-content" style="display: block; transform: translateY(100%); opacity: 0;">
              ${line}
            </span>
          </span>`
        );
        heading.innerHTML = wrappedLines.join("");
      });
    }

    // Define the animation based on the type
    let animationOptions: any = { duration, delay, easing: [0.25, 0.1, 0, 1] };
    let animationTarget: any = {};

    switch (type) {
      case "fade-in":
        animationTarget = { opacity: [0, 1] };
        break;
      case "slide-up":
        animationTarget = {
          opacity: [0, 1],
          transform: ["translateY(20px)", "translateY(0)"],
        };
        break;
      case "slide-in-left":
        animationTarget = {
          opacity: [0, 1],
          transform: ["translateX(-20px)", "translateX(0)"],
        };
        break;
      case "slide-in-right":
        animationTarget = {
          opacity: [0, 1],
          transform: ["translateX(20px)", "translateX(0)"],
        };
        break;
      case "scale-in":
        animationTarget = {
          opacity: [0, 1],
          transform: ["scale(0.95)", "scale(1)"],
        };
        break;
      case "mask-up":
        // Mask up animation is handled differently
        break;
      case "none":
        // No animation
        return;
    }

    // Setup the inView observer
    const cleanup = inView(
      ref.current,
      (info) => {
        if (type === "mask-up") {
          // Animate each line with staggered delay
          const maskLines = info.target.querySelectorAll(".mask-up-content");
          if (maskLines.length > 0) {
            animate(
              maskLines,
              {
                opacity: [0, 1],
                transform: ["translateY(100%)", "translateY(0%)"],
              },
              {
                duration,
                delay: stagger(staggerDelay, { start: delay }),
                easing: [0.25, 0.1, 0, 1],
              },
            );
          }
        } else if (staggerChildren) {
          // Animate each child with staggered delay
          const childElements = Array.from(info.target.children);
          animate(
            childElements,
            animationTarget,
            {
              ...animationOptions,
              delay: stagger(staggerDelay, { start: delay }),
            },
          );
        } else {
          // Animate the entire container
          animate(info.target, animationTarget, animationOptions);
        }

        setHasAnimated(true);

        // If once is true, unobserve after animation
        if (once) {
          cleanup();
        }
      },
      {
        amount: threshold,
        margin: rootMargin,
      },
    );

    // Cleanup function
    return cleanup;
  }, [
    type,
    duration,
    delay,
    staggerChildren,
    staggerDelay,
    threshold,
    rootMargin,
    once,
    hasAnimated,
  ]);

  return (
    <div
      ref={ref}
      class={`animation-container ${className}`}
      style={{
        opacity: type !== "mask-up" && type !== "none" ? 0 : 1,
        ...style,
      }}
      data-animation-type={type}
    >
      {children}
    </div>
  );
}

/**
 * Animation context and helpers for managing animations site-wide
 */
export const animations = {
  // Helper function to create consistent animations for sections
  section: (
    customProps: Partial<AnimationProps> = {},
  ): Partial<AnimationProps> => ({
    type: "fade-in" as AnimationType,
    duration: 0.7,
    threshold: 0.1,
    once: true,
    ...customProps,
  }),

  // Animation config presets
  presets: {
    fadeIn: {
      type: "fade-in" as AnimationType,
      duration: 0.5,
      delay: 0.1,
    },
    slideUp: {
      type: "slide-up" as AnimationType,
      duration: 0.6,
      delay: 0.1,
    },
    slideInLeft: {
      type: "slide-in-left" as AnimationType,
      duration: 0.6,
      delay: 0.1,
    },
    slideInRight: {
      type: "slide-in-right" as AnimationType,
      duration: 0.6,
      delay: 0.1,
    },
    scaleIn: {
      type: "scale-in" as AnimationType,
      duration: 0.5,
      delay: 0.1,
    },
    maskUp: {
      type: "mask-up" as AnimationType,
      duration: 0.8,
      staggerDelay: 0.1,
      delay: 0.1,
    },
    staggeredChildren: {
      type: "fade-in" as AnimationType,
      duration: 0.5,
      staggerChildren: true,
      staggerDelay: 0.1,
    },
  },
};
