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
    <div className="w-full py-20 bg-ca-900">
      <ContentContainer className="flex flex-col justify-start items-center gap-24">
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
          <h2 className="text-center text-ca-50 text-6xl font-normal font-serif leading-[56px]">
            {title}
          </h2>
        </div>

        {/* Content */}
        <ServicesAccordion services={services} />
      </ContentContainer>
    </div>
  );
}

export default ServicesSection;
