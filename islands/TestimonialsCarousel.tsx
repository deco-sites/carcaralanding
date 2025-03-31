/** @jsxImportSource preact */
import { useEffect, useRef, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import { animate } from "npm:@motionone/dom@10.18.0";
import type { Testimonial } from "../sections/TestimonialsSection.tsx";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoSlideInterval: number;
}

export default function TestimonialsCarousel({
  testimonials,
  autoSlideInterval,
}: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  // Handle navigation
  const goToSlide = (index: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex(index);

    // Reset autoplay timer
    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
    }

    if (autoSlideInterval > 0) {
      autoplayTimerRef.current = window.setTimeout(() => {
        const nextIndex = (index + 1) % testimonials.length;
        goToSlide(nextIndex);
      }, autoSlideInterval);
    }

    // Add animation to the slide transition
    if (testimonialsRef.current) {
      const currentTestimonial = testimonialsRef.current.querySelector(
        ".active-testimonial",
      );

      if (currentTestimonial) {
        animate(
          currentTestimonial,
          { opacity: [0, 1], y: [20, 0] },
          { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
        ).finished.then(() => {
          setIsAnimating(false);
        });
      }
    }
  };

  // Initialize autoplay on mount
  useEffect(() => {
    if (autoSlideInterval > 0) {
      autoplayTimerRef.current = window.setTimeout(() => {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        goToSlide(nextIndex);
      }, autoSlideInterval);
    }

    return () => {
      if (autoplayTimerRef.current) {
        window.clearTimeout(autoplayTimerRef.current);
      }
    };
  }, []);

  // Extract current testimonial
  const currentTestimonial = testimonials[activeIndex];

  return (
    <div
      ref={testimonialsRef}
      className="max-w-4xl mx-auto mb-12 md:mb-16 relative"
    >
      {/* Active Testimonial */}
      <div className="active-testimonial relative bg-ca-800/50 rounded-lg p-8 border border-ca-700">
        {/* Accent color strip */}
        <div
          className={`absolute top-0 left-0 w-full h-1 transform origin-left ${
            currentTestimonial.accentColor || "bg-vermelho"
          }`}
        />

        {/* Quote Icon */}
        <div className="absolute top-5 right-6 text-ca-700 opacity-30">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 11C10 9.89543 9.10457 9 8 9H7.5C6.67157 9 6 8.32843 6 7.5V7C6 6.44772 6.44772 6 7 6H7.5C7.77614 6 8 5.77614 8 5.5V5C8 4.44772 7.55228 4 7 4H5C4.44772 4 4 4.44772 4 5V7.5C4 9.84902 3.99999 11 3.99999 11C3.99999 13.2091 5.79086 15 7.99999 15H8C9.10457 15 10 14.1046 10 13V11Z"
              fill="currentColor"
            />
            <path
              d="M22 11C22 9.89543 21.1046 9 20 9H19.5C18.6716 9 18 8.32843 18 7.5V7C18 6.44772 18.4477 6 19 6H19.5C19.7761 6 20 5.77614 20 5.5V5C20 4.44772 19.5523 4 19 4H17C16.4477 4 16 4.44772 16 5V7.5C16 9.84902 16 11 16 11C16 13.2091 17.7909 15 20 15H20C21.1046 15 22 14.1046 22 13V11Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Testimonial content */}
        <div className="mb-8 text-ca-50 text-xl sm:text-2xl leading-relaxed italic max-w-3xl">
          "{currentTestimonial.quote}"
        </div>

        {/* Author information */}
        <div className="flex items-center">
          {currentTestimonial.avatar && (
            <div className="mr-4">
              <Image
                src={currentTestimonial.avatar}
                alt={currentTestimonial.name}
                width={56}
                height={56}
                class="rounded-full object-cover w-14 h-14"
              />
            </div>
          )}

          <div>
            <div className="text-ca-50 font-semibold">
              {currentTestimonial.name}
            </div>
            <div className="text-ca-300 text-sm">
              {currentTestimonial.position}, {currentTestimonial.company}
            </div>
          </div>

          {currentTestimonial.logo && (
            <div className="ml-auto">
              <Image
                src={currentTestimonial.logo}
                alt={`${currentTestimonial.company} logo`}
                width={100}
                height={40}
                class="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-vermelho"
                  : "w-2 bg-ca-700 hover:bg-ca-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              const prevIndex = activeIndex === 0
                ? testimonials.length - 1
                : activeIndex - 1;
              goToSlide(prevIndex);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-ca-700 text-ca-50 hover:bg-ca-800 transition-colors"
            aria-label="Previous testimonial"
          >
            <Icon id="ChevronLeft" size={20} />
          </button>

          <button
            onClick={() => {
              const nextIndex = (activeIndex + 1) % testimonials.length;
              goToSlide(nextIndex);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-ca-700 text-ca-50 hover:bg-ca-800 transition-colors"
            aria-label="Next testimonial"
          >
            <Icon id="ChevronRight" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
