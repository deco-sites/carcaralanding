import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Eyebrow } from "./ui/Typography.tsx";
import { Signal, signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { ComponentChildren } from "preact";

export interface SliderCard {
  /**
   * Image for the card
   */
  image: ImageWidget;

  /**
   * Title/label for the card
   */
  title: string;
}

export interface SliderHeroProps {
  /**
   * List of cards for the carousel
   */
  cards: SliderCard[];

  /**
   * Interval for auto-sliding in milliseconds
   * @default 4000
   */
  interval?: number;
}

// Active index state
const activeIndex = signal(0);

export default function SliderHero({
  cards = [],
  interval = 4000,
}: SliderHeroProps) {
  const sliderId =
    useRef(`slider-${Math.random().toString(36).substring(2, 11)}`).current;
  const cardsCount = cards.length;

  // Reset index when component mounts/unmounts
  useEffect(() => {
    activeIndex.value = 0;
    return () => {
      activeIndex.value = 0;
    };
  }, [sliderId]);

  // Auto-slide functionality
  useEffect(() => {
    if (interval && cardsCount > 0) {
      const intervalId = setInterval(() => {
        activeIndex.value = (activeIndex.value + 1) % cardsCount;
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [interval, cardsCount]);

  // If we have no cards, render nothing
  if (cardsCount === 0) {
    return null;
  }

  return (
    <div
      id={sliderId}
      className="relative w-full overflow-hidden bg-ca-900 pt-6 pb-12"
      aria-label="Hero image carousel"
    >
      {/* Carousel */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-[450px] md:h-[500px]">
          {cards.map((card, index) => {
            const isActive = activeIndex.value === index;
            const isPrev =
              index === (activeIndex.value - 1 + cardsCount) % cardsCount;
            const isNext = index === (activeIndex.value + 1) % cardsCount;

            // Calculate position classes based on card state
            let positionClasses = "";
            let zIndex = 10;
            let opacity = "opacity-40";

            if (isActive) {
              positionClasses =
                "left-1/2 -translate-x-1/2 w-[80%] md:w-[70%] scale-100";
              zIndex = 30;
              opacity = "opacity-100";
            } else if (isPrev) {
              positionClasses =
                "left-[10%] md:left-[15%] -translate-x-1/2 w-[60%] md:w-[55%] scale-90";
              zIndex = 20;
              opacity = "opacity-70";
            } else if (isNext) {
              positionClasses =
                "left-[90%] md:left-[85%] -translate-x-1/2 w-[60%] md:w-[55%] scale-90";
              zIndex = 20;
              opacity = "opacity-70";
            } else {
              positionClasses = index < activeIndex.value
                ? "left-0 -translate-x-full w-[60%] scale-90"
                : "left-full translate-x-0 w-[60%] scale-90";
              opacity = "opacity-0";
            }

            return (
              <div
                key={`slider-card-${index}`}
                className={`absolute top-1/2 -translate-y-1/2 ${positionClasses} ${opacity} transition-all duration-500 ease-in-out shadow-xl`}
                style={{ zIndex }}
                aria-hidden={!isActive}
              >
                <div className="flex flex-col rounded-lg overflow-hidden bg-ca-800 h-full">
                  {/* Card title/label */}
                  <div className="w-full bg-ca-700 p-3 text-center">
                    <Eyebrow class="text-ca-50 font-medium">
                      {card.title}
                    </Eyebrow>
                  </div>

                  {/* Card image */}
                  <div className="w-full flex-1 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={1440}
                      height={474}
                      class="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-4">
          {cards.map((_, index) => (
            <button
              key={`slider-dot-${index}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex.value === index
                  ? "bg-vermelho scale-125"
                  : "bg-ca-500 hover:bg-ca-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                activeIndex.value = index;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
