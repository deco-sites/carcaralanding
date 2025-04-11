/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import { Body } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";

interface ProcessStep {
  /**
   * Step icon (Material Symbols icon name)
   */
  icon: string;

  /**
   * Step title
   */
  title: string;

  /**
   * Step description
   */
  description: string;

  /**
   * Background color class
   */
  bgColor: string;
}

export interface SACAgentProcessProps {
  /**
   * @default "How it Works"
   */
  badgeText?: string;

  /**
   * @format rich-text
   * @default "Intelligent <span class='text-vermelho'>Ticket Processing</span>"
   */
  title?: string;

  /**
   * @default "Our AI Agent follows a sophisticated workflow to handle customer support tickets efficiently and accurately."
   */
  description?: string;

  /**
   * CTA button text
   * @default "See it in Action"
   */
  ctaText?: string;

  /**
   * CTA button URL
   * @default "#demo"
   */
  ctaUrl?: string;

  /**
   * Process steps to display
   */
  steps?: ProcessStep[];

  /**
   * Additional CSS classes
   */
  class?: string;
}

export default function SACAgentProcess({
  badgeText = "How it Works",
  title = "Intelligent <span class='text-vermelho'>Ticket Processing</span>",
  description =
    "Our AI Agent follows a sophisticated workflow to handle customer support tickets efficiently and accurately.",
  ctaText = "See it in Action",
  ctaUrl = "#demo",
  steps = [
    {
      icon: "category",
      title: "Ticket Classification",
      description:
        "Advanced analysis to properly categorize and prioritize each ticket",
      bgColor: "bg-azul",
    },
    {
      icon: "database",
      title: "Information Gathering",
      description:
        "Smart system integration to collect all relevant customer data",
      bgColor: "bg-verde",
    },
    {
      icon: "chat",
      title: "Response Generation",
      description:
        "Contextual response creation balancing standardization and personalization",
      bgColor: "bg-vermelho",
    },
    {
      icon: "escalator_warning",
      title: "Smart Escalation",
      description:
        "Intelligent routing ensuring complex cases receive proper attention",
      bgColor: "bg-amarelo",
    },
  ],
  class: className = "",
}: SACAgentProcessProps) {
  return (
    <section
      id="process"
      className={`relative w-full bg-ca-900 overflow-hidden ${className}`}
    >
      <ContentContainer className="py-8 px-4 sm:px-16 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col justify-start items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Header Section */}
          <div className="w-full max-w-[632px] mx-auto flex flex-col justify-start items-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-0">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>

            <h2
              className="text-center text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <Body class="text-center text-ca-300 max-w-2xl">
              {description}
            </Body>

            <Button
              href={ctaUrl}
              variant="primary"
              size="md"
              class="w-full sm:w-auto"
            >
              {ctaText}
            </Button>
          </div>

          {/* Process Steps Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 sm:p-5 md:p-6 ${step.bgColor} flex flex-col justify-end items-start gap-3 sm:gap-4 min-h-[470px] sm:min-h-[450px] w-full relative overflow-hidden`}
              >
                {/* Step Icon */}
                <div className="w-12 h-12 bg-ca-50/10 flex items-center justify-center rounded-lg">
                  <span
                    className="material-symbols-rounded text-ca-50"
                    style={{
                      fontSize: "24px",
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    {step.icon}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-ca-50 text-2xl sm:text-2xl md:text-3xl font-normal">
                    {step.title}
                  </h3>
                  <p className="text-ca-100 text-sm sm:text-base leading-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
