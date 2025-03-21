import { Animation } from "../components/ui/Animation.tsx";
import {
  animateElement,
  sectionAnimations,
  withSectionAnimation,
} from "../utils/animateSection.tsx";
import { Body, H2 } from "../components/ui/Typography.tsx";

/**
 * Example 1: Using the Animation component directly
 */
export function BasicAnimationExample() {
  return (
    <section className="py-10">
      <Animation type="fade-in" duration={0.5} threshold={0.1}>
        <div className="container mx-auto">
          <H2>This section fades in</H2>
          <Body>The entire section fades in when it enters the viewport</Body>
        </div>
      </Animation>
    </section>
  );
}

/**
 * Example 2: Using sectionAnimations presets
 */
export function PresetAnimationExample() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <Animation {...sectionAnimations.header}>
          <H2>This heading uses the mask-up animation</H2>
        </Animation>

        <Animation {...sectionAnimations.content} delay={0.3}>
          <Body>This content fades in with a delay after the heading</Body>
        </Animation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Animation {...sectionAnimations.cards}>
            <div className="bg-ca-800 p-6 rounded-lg">Card 1</div>
            <div className="bg-ca-800 p-6 rounded-lg">Card 2</div>
            <div className="bg-ca-800 p-6 rounded-lg">Card 3</div>
          </Animation>
        </div>
      </div>
    </section>
  );
}

/**
 * Example 3: Using the animateElement utility
 */
export function AnimateElementExample() {
  const heading = <H2>This heading slides in from the left</H2>;
  const content = <Body>This content slides in from the right</Body>;

  return (
    <section className="py-10">
      <div className="container mx-auto">
        {animateElement(heading, sectionAnimations.fromLeft)}
        {animateElement(content, sectionAnimations.fromRight, { delay: 0.3 })}
      </div>
    </section>
  );
}

/**
 * Example 4: Creating an animated component with Higher Order Component
 */
function SimpleSection(props: { title: string; content: string }) {
  return (
    <div className="py-10 bg-ca-900">
      <div className="container mx-auto">
        <H2>{props.title}</H2>
        <Body>{props.content}</Body>
      </div>
    </div>
  );
}

// Create an animated version of the section
const AnimatedSection = withSectionAnimation(SimpleSection);

export function HOCExample() {
  return (
    <AnimatedSection
      title="This entire section animates"
      content="Using the HOC pattern makes it easy to animate entire sections"
      // Override animation defaults
      animationProps={{
        type: "slide-up",
        duration: 0.8,
        delay: 0.2,
      }}
    />
  );
}

/**
 * Implementation guide:
 *
 * 1. For simple fade-in animations:
 *    <Animation type="fade-in">
 *      <YourComponent />
 *    </Animation>
 *
 * 2. For mask-up animations on headings:
 *    <Animation type="mask-up">
 *      <h1>Your Heading Here</h1>
 *    </Animation>
 *
 * 3. For staggered children animations:
 *    <Animation type="fade-in" staggerChildren staggerDelay={0.1}>
 *      <div>First child</div>
 *      <div>Second child (appears 0.1s after first)</div>
 *      <div>Third child (appears 0.2s after first)</div>
 *    </Animation>
 *
 * 4. To use animation presets:
 *    <Animation {...sectionAnimations.header}>
 *      <h2>Section Header</h2>
 *    </Animation>
 */
