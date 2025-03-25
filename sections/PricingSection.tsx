/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import { Body, H1, H3Serif } from "../components/ui/Typography.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface PricingPlan {
  /**
   * @title Plan Title
   * @description The name of the pricing plan
   */
  title: string;

  /**
   * @title Plan Price
   * @description The price of the plan (e.g., "$225/hr", "$6,500/m")
   */
  price: string;

  /**
   * @title Background Color
   * @description Background color class for the plan card (if any)
   */
  bgColor?: string;

  /**
   * @title Features List
   * @description List of features included in this plan
   */
  features: string[];

  /**
   * @title CTA Text
   * @description Text for the call-to-action button
   */
  ctaText: string;

  /**
   * @title CTA URL
   * @description URL for the call-to-action button
   */
  ctaUrl: string;
}

export interface PricingSectionProps {
  /**
   * @title Badge Text
   * @description Text displayed in the badge above the title
   * @default "Pricing"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @description Main title of the section
   * @default "Reduce your ai-risk by partnering with a proven team"
   */
  title?: string;

  /**
   * @title Description
   * @description Text displayed below the title
   * @default "Our team of ai developers & project managers are proficient with APIs, webhooks, databases, vector databases, RAG, prompt engineering, agent architecture, integrations, and ai platforms like n8n."
   */
  description?: string;

  /**
   * @title Consulting Plan
   * @description Details for the consulting plan
   */
  consultingPlan?: Partial<PricingPlan>;

  /**
   * @title Pilot Project Plan
   * @description Details for the pilot project plan
   */
  pilotPlan?: Partial<PricingPlan>;

  /**
   * @title AI Agent Development Plan
   * @description Details for the AI agent development plan
   */
  developmentPlan?: Partial<PricingPlan>;

  /**
   * @title Background Image
   * @description Decorative background image (if any)
   */
  backgroundImage?: ImageWidget;

  /**
   * @title Additional CSS classes
   */
  class?: string;
}

const defaultPlans = {
  consulting: {
    title: "CONSULTING",
    price: "$225/hr",
    features: [
      "AI Strategy Development",
      "Workflow troubleshooting",
      "Wireframes & Workshops",
      "Bulk options available",
    ],
    ctaText: "Book Call",
    ctaUrl: "/contact",
  },
  pilotProject: {
    title: "PILOT PROJECT",
    price: "Get quote",
    bgColor: "bg-ca-900",
    features: [
      "Have a specific project in mind?",
      "Fully scope project",
      "30-60 day turnaround",
      "Projects intended for commercial use are accepted",
    ],
    ctaText: "Get Quote",
    ctaUrl: "/quote",
  },
  development: {
    title: "AI AGENT DEVELOPMENT PARTNER",
    price: "$6,500/m",
    features: [
      "Dedicated AI Agent development team",
      "Project Manager & AI Developer",
      "Month to month",
      "Scale up based on your needs",
    ],
    ctaText: "Book Call",
    ctaUrl: "/contact",
  },
} as const;

export default function PricingSection({
  badgeText = "PRICING",
  title = "Reduce your ai-risk by partnering with a proven team",
  description =
    "Our team of ai developers & project managers are proficient with APIs, webhooks, databases, vector databases, RAG, prompt engineering, agent architecture, integrations, and ai platforms like n8n.",
  consultingPlan: consultingPlanProps = {},
  pilotPlan: pilotPlanProps = {},
  developmentPlan: developmentPlanProps = {},
  backgroundImage,
  class: className = "",
}: PricingSectionProps) {
  // Merge default values with CMS props
  const consultingPlan = { ...defaultPlans.consulting, ...consultingPlanProps };
  const pilotPlan = { ...defaultPlans.pilotProject, ...pilotPlanProps };
  const developmentPlan = {
    ...defaultPlans.development,
    ...developmentPlanProps,
  };

  return (
    <section
      className={`relative w-full bg-ca-900 overflow-hidden ${className}`}
    >
      <ContentContainer className="py-16 lg:py-24 px-4 sm:px-8 md:px-12">
        <div className="flex flex-col justify-start items-center gap-16">
          {/* Header */}
          <div className="w-full max-w-[883px] flex flex-col justify-start items-center gap-6">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>

            <H1 className="text-center text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
              {title}
            </H1>

            <Body class="max-w-3xl text-center text-ca-300">
              {description}
            </Body>
          </div>

          {/* Pricing Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:items-center">
            {/* Consulting Plan */}
            <div className="flex flex-col h-full p-8 border border-ca-700 rounded-none md:self-stretch">
              <div className="mb-8">
                <H3Serif className="text-ca-300 mb-4">
                  {consultingPlan.title}
                </H3Serif>
                <div className="text-ca-50 text-5xl font-serif">
                  {consultingPlan.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {consultingPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-ca-300 text-xl">•</span>
                    <span className="text-ca-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  href={consultingPlan.ctaUrl}
                  variant="outline"
                  size="md"
                  class="w-full"
                >
                  {consultingPlan.ctaText}
                </Button>
              </div>
            </div>

            {/* Pilot Project */}
            <div
              className={`flex flex-col h-full p-8 bg-vermelho border border-ca-700 rounded-none md:-my-8 z-10 md:self-stretch`}
            >
              <div className="mb-8">
                <H3Serif className="text-ca-50 mb-4">
                  {pilotPlan.title}
                </H3Serif>
                <div className="text-ca-50 text-5xl font-serif">
                  {pilotPlan.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pilotPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-ca-50 text-xl">•</span>
                    <span className="text-ca-50">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  href={pilotPlan.ctaUrl}
                  variant="primary"
                  size="md"
                  class="w-full"
                >
                  {pilotPlan.ctaText}
                </Button>
              </div>
            </div>

            {/* Development Partner */}
            <div className="flex flex-col h-full p-8 border border-ca-700 rounded-none md:self-stretch">
              <div className="mb-8">
                <H3Serif className="text-ca-300 mb-4">
                  {developmentPlan.title}
                </H3Serif>
                <div className="text-ca-50 text-5xl font-serif">
                  {developmentPlan.price}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {developmentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-ca-300 text-xl">•</span>
                    <span className="text-ca-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  href={developmentPlan.ctaUrl}
                  variant="outline"
                  size="md"
                  class="w-full"
                >
                  {developmentPlan.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
