"use client";

import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import { animate } from "npm:@motionone/dom@10.18.0";
import ServicesAccordion from "../islands/ServicesAccordion.tsx";
import { H1 } from "site/components/ui/Typography.tsx";

interface Service {
  /**
   * Service title
   */
  title: string;

  /**
   * Service subtitle
   */
  subtitle: string;

  /**
   * Service description
   */
  description: string;

  /**
   * Service image
   */
  image: ImageWidget;

  /**
   * Button text
   * @default "Saiba mais"
   */
  buttonText?: string;

  /**
   * Button link
   */
  buttonLink?: string;
}

interface ServicesSectionProps {
  /**
   * Section badge text
   * @default "Serviços"
   */
  badgeText?: string;

  /**
   * Section title
   * @default "Soluções que estão mudando o jogo"
   */
  title?: string;

  /**
   * List of services
   */
  services?: Service[];
}

function ServicesSection({
  badgeText = "Serviços",
  title = "Soluções que estão mudando o jogo",
  services = [],
}: ServicesSectionProps) {
  if (!services.length) return null;

  return (
    <div id="services" className="w-full py-20 bg-ca-900">
      <ContentContainer className="flex px-4 md:px-16 flex-col justify-start items-center gap-24">
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
          <H1 className="text-left text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
            {title}
          </H1>
        </div>

        {/* Content */}
        <ServicesAccordion services={services} />
      </ContentContainer>
    </div>
  );
}

export default ServicesSection;
