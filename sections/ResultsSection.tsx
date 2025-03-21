import { ComponentChildren } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Body, Eyebrow, H1 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import { useEffect, useRef } from "preact/hooks";

/**
 * Interface for individual statistic items
 */
export interface StatisticItem {
  /**
   * The prefix to display before the number (e.g., "+" or empty)
   * @default ""
   */
  prefix?: string;

  /**
   * The main numerical value to display
   * @default "300"
   */
  value: string;

  /**
   * The suffix to display after the number (e.g., "%" or "x" or empty)
   * @default ""
   */
  suffix?: string;

  /**
   * The description text below the number
   * @default "AI Agents operando"
   */
  description: string;

  /**
   * The color of the prefix/suffix for emphasis
   * @default "amarelo" for first stat, "verde" for second, "azul" for third
   */
  accentColor?: "amarelo" | "verde" | "azul" | "vermelho";
}

export interface ResultsSectionProps {
  /**
   * Badge text displayed at the top of the section
   * @default "Resultados"
   */
  badgeText?: string;

  /**
   * The title of the section
   * @format rich-text
   * @default "Nossos clientes vencem com AI"
   */
  title?: string;

  /**
   * The subtitle/description text
   * @default "Nossos projetos fazem a ponte entre o desafio de negócio e um AI Agent que dá resultado."
   */
  subtitle?: string;

  /**
   * The statistics to display in the section
   */
  statistics?: StatisticItem[];

  /**
   * Enable number animation
   * @default true
   */
  animateNumbers?: boolean;

  /**
   * Animation duration in milliseconds
   * @default 2000
   */
  animationDuration?: number;

  /**
   * Additional CSS classes for the container
   */
  class?: string;
}

/**
 * Renders an individual statistic item
 */
function StatisticBlock({
  prefix = "",
  value,
  suffix = "",
  description,
  accentColor = "amarelo",
}: StatisticItem) {
  return (
    <div className="flex-1 self-stretch p-4 sm:p-6 md:p-10 lg:p-20 flex flex-col justify-center items-start gap-2">
      <div className="self-stretch">
        {prefix && (
          <span
            className={`text-${accentColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight`}
          >
            {prefix}
          </span>
        )}
        <span
          className="text-ca-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight"
          data-value={value}
        >
          {value}
        </span>
        {suffix && (
          <span
            className={`text-${accentColor} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight`}
          >
            {suffix}
          </span>
        )}
      </div>
      <div className="self-stretch h-px bg-ca-700" />
      <div className="self-stretch">
        <Eyebrow class="text-ca-50 text-sm sm:text-base md:text-lg font-normal leading-6 sm:leading-7">
          {description}
        </Eyebrow>
      </div>
    </div>
  );
}

/**
 * Results Section component that displays key metrics with optional animation
 */
export default function ResultsSection({
  badgeText = "Resultados",
  title = "Nossos clientes vencem com AI",
  subtitle =
    "Nossos projetos fazem a ponte entre o desafio de negócio e um AI Agent que dá resultado.",
  statistics = [
    {
      prefix: "+",
      value: "300",
      description: "AI Agents operando",
      accentColor: "vermelho",
    },
    {
      value: "20",
      suffix: "x",
      description: "Do que processos anteriores",
      accentColor: "verde",
    },
    {
      prefix: "+",
      value: "80",
      suffix: "%",
      description: "De economia imediata",
      accentColor: "azul",
    },
  ],
  animateNumbers = true,
  animationDuration = 2000,
  class: className = "",
}: ResultsSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  // Number animation effect
  useEffect(() => {
    if (!animateNumbers || !statsRef.current) return;

    const valueElements = statsRef.current.querySelectorAll("[data-value]");

    const animateValue = (
      element: Element,
      start: number,
      end: number,
      duration: number,
    ) => {
      const startTimestamp = performance.now();
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toString();

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = end.toString();
        }
      };

      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            valueElements.forEach((element) => {
              const targetValue = parseInt(
                element.getAttribute("data-value") || "0",
                10,
              );
              animateValue(element, 0, targetValue, animationDuration);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(statsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [animateNumbers, animationDuration]);

  return (
    <div
      className={`w-full bg-ca-900 !pb-0 py-8 sm:py-10 md:py-16 lg:pt-20 overflow-hidden ${className}`}
    >
      <ContentContainer>
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="w-full max-w-4xl flex flex-col justify-start items-center gap-3 sm:gap-4 md:gap-6">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>

            <H1 class="text-center text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal">
              {title}
            </H1>

            <Body class="text-center max-w-[280px] sm:max-w-sm md:max-w-md text-ca-300 px-4 sm:px-0">
              {subtitle}
            </Body>
          </div>
        </div>
      </ContentContainer>

      <div
        ref={statsRef}
        className="w-full border-t border-ca-700 mt-6 sm:mt-8 md:mt-10"
      >
        <ContentContainer className="flex flex-col md:flex-row">
          {statistics.map((stat, index) => (
            <>
              <StatisticBlock key={`stat-${index}`} {...stat} />
              {index < statistics.length - 1 && (
                <div className="hidden md:block w-px self-stretch border-r border-ca-700">
                </div>
              )}
            </>
          ))}
        </ContentContainer>
      </div>
    </div>
  );
}
