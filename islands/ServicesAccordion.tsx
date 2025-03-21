import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";

const PROGRESS_COLORS = [
  "#CC8B43", // amarelo
  "#4C7780", // azul
  "#B13431", // vermelho
  "#557247", // verde
];

interface Service {
  title: string;
  subtitle: string;
  description: string;
  image: ImageWidget;
  buttonText?: string;
  buttonLink?: string;
}

interface ServicesAccordionProps {
  services: Service[];
}

function ServicesAccordion({ services }: ServicesAccordionProps) {
  const itemVisible = useSignal(0);
  const isAnimating = useSignal(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const getProgressColor = (index: number) => {
    return PROGRESS_COLORS[index % PROGRESS_COLORS.length];
  };

  const startAutoSwitch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Start with animation disabled
    isAnimating.value = false;
    // Force a reflow
    setTimeout(() => {
      // Enable animation
      isAnimating.value = true;
    }, 0);

    intervalRef.current = window.setInterval(() => {
      // Disable animation before changing item
      isAnimating.value = false;
      itemVisible.value = (itemVisible.value + 1) % services.length;
      // Force a reflow
      setTimeout(() => {
        // Enable animation
        isAnimating.value = true;
      }, 0);
    }, 5000);
  };

  const stopAutoSwitch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleItemClick = (index: number) => {
    stopAutoSwitch();
    isAnimating.value = false;
    itemVisible.value = index;
    // Force a reflow
    setTimeout(() => {
      isAnimating.value = true;
      startAutoSwitch();
    }, 0);
  };

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement || !services || services.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoSwitch();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(containerElement);

    return () => {
      observer.disconnect();
      stopAutoSwitch();
    };
  }, [services]);

  useEffect(() => {
    return () => stopAutoSwitch();
  }, []);

  return (
    <div
      className="self-stretch min-h-[760px] flex flex-col md:flex-row justify-start items-stretch gap-8 md:gap-16"
      ref={containerRef}
    >
      {/* Service List Column */}
      <div className="flex-1 max-w-full md:max-w-[500px] flex flex-col">
        {services.map((service, index) => {
          const isActive = itemVisible.value === index;
          return (
            <div
              key={service.title}
              className={`${
                index === services.length - 1 ? "border-b" : ""
              } border-[#616B6B] transition-[flex] duration-700 ease-in-out ${
                isActive ? "flex-1" : "flex-none"
              }`}
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleItemClick(index)}
                  className={`w-full text-left transition-colors ${
                    isActive ? "pt-6 pb-2" : "py-3"
                  } ${
                    isActive ? "text-ca-50" : "text-ca-300 hover:text-ca-200"
                  }`}
                >
                  <h3
                    className={`font-normal leading-normal transition-all duration-700 ${
                      isActive ? "text-3xl" : "text-2xl"
                    }`}
                  >
                    {service.title}
                  </h3>
                </button>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#616B6B]">
                  <div
                    style={{ backgroundColor: getProgressColor(index) }}
                    className={`h-full w-0 ${
                      isActive && isAnimating.value
                        ? "transition-[width] duration-[5000ms] ease-linear !w-full"
                        : ""
                    }`}
                  />
                </div>
              </div>
              <div
                className={`grid overflow-hidden transition-all duration-700 ease-in-out ${
                  isActive
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="overflow-hidden">
                        <p
                          className={`text-ca-400 text-3xl font-serif leading-none transform transition-all duration-700 ease-out ${
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                          }`}
                        >
                          {service.subtitle}
                        </p>
                      </div>
                      <div className="overflow-hidden mt-6">
                        <p
                          className={`text-ca-300 text-base leading-normal transform transition-all duration-700 delay-150 ease-out ${
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-10 overflow-hidden">
                      <div
                        className={`transform transition-all duration-700 delay-300 ease-out ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        }`}
                      >
                        <Button
                          href={service.buttonLink || "#"}
                          variant="primary"
                          size="md"
                        >
                          {service.buttonText || "Saiba mais"}
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Image - only shown on mobile */}
                    <div className="mt-8 block md:hidden overflow-hidden">
                      <div
                        className={`transform transition-opacity duration-700 delay-300 ease-out ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={500}
                          height={300}
                          className="w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Image Column - only shown on desktop */}
      <div className="hidden md:block flex-1 sticky top-0 h-[760px]">
        {services.map((service, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === itemVisible.value ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={service.image}
              alt={service.title}
              width={748}
              height={760}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesAccordion;
