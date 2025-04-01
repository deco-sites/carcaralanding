/** @jsxImportSource preact */
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import SliderJS from "./SliderJS.tsx";
import { Testimonial } from "../sections/TestimonialsSection.tsx";

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoSlideInterval?: number;
}

export default function TestimonialsCarousel({
  testimonials,
  autoSlideInterval = 6000,
}: TestimonialsCarouselProps) {
  const id = useRef(
    `testimonial-slider-${Math.random().toString(36).substring(2, 11)}`,
  );
  const currentIndex = useSignal(0);

  const handleDotClick = (index: number) => {
    currentIndex.value = index;
  };

  useEffect(() => {
    // Set up auto-slide if interval is provided
    if (autoSlideInterval > 0) {
      const interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % testimonials.length;
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [autoSlideInterval, testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return <div>No testimonials to display</div>;
  }

  return (
    <div id={id.current} className="w-full max-w-5xl mx-auto mb-16">
      <div class="relative">
        {/* Carousel */}
        <div
          class="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
          data-slider
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={`testimonial-${index}`}
              class="w-full flex-none snap-center px-4 sm:px-6 lg:px-8"
              data-slider-item={index}
            >
              <div
                class={` bg-ca-800 border border-ca-700 ${testimonial.accentColor} p-8 sm:p-16 h-full`}
              >
                <div class="flex flex-col h-full">
                  <div class="mb-4 sm:mb-6">
                    <blockquote class="text-ca-100 font-serif text-lg sm:text-3xl italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  <div class="mt-auto flex flex-col sm:flex-row sm:items-center pt-4 border-t border-ca-700">
                    {testimonial.avatar && (
                      <div class="mr-4 mb-3 sm:mb-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          class="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    )}

                    <div class="flex-1">
                      <p class="text-ca-50 font-semibold">
                        {testimonial.name}
                      </p>
                      <p class="text-ca-300 text-sm">
                        {testimonial.position} • {testimonial.company}
                      </p>
                    </div>

                    {testimonial.logo && (
                      <div class="mt-3 sm:mt-0">
                        <img
                          src={testimonial.logo}
                          alt={`${testimonial.company} logo`}
                          class="h-8 object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div class="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={`dot-${index}`}
              data-dot={index}
              aria-label={`Go to testimonial ${index + 1}`}
              class={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex.value
                  ? "bg-ca-50 w-6"
                  : "bg-ca-600 hover:bg-ca-500"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      <SliderJS rootId={id.current} interval={autoSlideInterval} />
    </div>
  );
}
