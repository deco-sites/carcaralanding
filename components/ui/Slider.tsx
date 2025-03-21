import { Signal, signal } from "@preact/signals";
import { ComponentChildren, JSX } from "preact";
import { useEffect } from "preact/hooks";

interface Props {
  class?: string;
  rootId: string;
  children?: ComponentChildren;
  interval?: number;
  infinite?: boolean;
}

interface ItemProps {
  index: number;
  class?: string;
  children?: ComponentChildren;
}

interface DotProps {
  index: number;
  children?: ComponentChildren;
}

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  children?: ComponentChildren;
}

// Shared state for the current slide index
const currentIndex: Signal<number> = signal(0);
const timer = signal<number | null>(null);

function Slider(
  { class: _class = "", rootId, children, interval, infinite }: Props,
) {
  const id = rootId;
  const items = Array.isArray(children) ? children : [children];
  const len = items.filter(Boolean).length;

  // Reset index when switching between carousels
  useEffect(() => {
    currentIndex.value = 0;
  }, [id]);

  // Auto-play functionality
  useEffect(() => {
    if (interval && len > 0) {
      const intervalId = setInterval(() => {
        if (infinite || currentIndex.value < len - 1) {
          currentIndex.value = (currentIndex.value + 1) % len;
        }
      }, interval);

      timer.value = intervalId;

      return () => {
        clearInterval(intervalId);
        timer.value = null;
      };
    }
  }, [interval, len, infinite]);

  return (
    <div
      id={id}
      class={_class}
      aria-label="carousel"
    >
      {children}
    </div>
  );
}

function Item({ index, class: _class = "", children }: ItemProps) {
  const selected = currentIndex.value === index;

  return (
    <div
      class={_class}
      data-slider-item={index}
      aria-hidden={!selected}
      role="tabpanel"
      style={{
        transform: `translateX(${(index - currentIndex.value) * 100}%)`,
        transition: "transform 400ms ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

function Dot({ children, index }: DotProps) {
  const isSelected = index === currentIndex.value;

  return (
    <button
      class={`group ${isSelected ? "disabled" : ""}`}
      role="tab"
      aria-label={`go to slide ${index + 1}`}
      aria-selected={isSelected}
      disabled={isSelected}
      onClick={() => {
        if (timer.value) {
          clearInterval(timer.value);
          timer.value = null;
        }
        currentIndex.value = index;
      }}
    >
      {children}
    </button>
  );
}

function PrevButton({ children, class: _class = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      class={_class}
      onClick={(e) => {
        if (timer.value) {
          clearInterval(timer.value);
          timer.value = null;
        }
        currentIndex.value = currentIndex.value === 0
          ? 0
          : currentIndex.value - 1;
        props.onClick?.(e);
      }}
      aria-label="Previous slide"
    >
      {children}
    </button>
  );
}

function NextButton({ children, class: _class = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      class={_class}
      onClick={(e) => {
        if (timer.value) {
          clearInterval(timer.value);
          timer.value = null;
        }
        currentIndex.value = currentIndex.value + 1;
        props.onClick?.(e);
      }}
      aria-label="Next slide"
    >
      {children}
    </button>
  );
}

Slider.Item = Item;
Slider.Dot = Dot;
Slider.PrevButton = PrevButton;
Slider.NextButton = NextButton;

export default Slider;
