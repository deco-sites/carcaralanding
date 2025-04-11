/** @jsxImportSource preact */
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import { Body } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";

export interface ImageTextSectionProps {
  /**
   * @default "Sobre"
   */
  badgeText?: string;

  /**
   * @format rich-text
   * @default "Conheça nossa <span class='text-vermelho'>plataforma</span>"
   */
  title?: string;

  /**
   * @default "Nossa plataforma foi desenvolvida para ajudar empresas a adotarem IA de forma rápida e eficiente, com resultados mensuráveis desde o primeiro dia."
   */
  description?: string;

  /**
   * CTA button text
   * @default "Saiba mais"
   */
  ctaText?: string;

  /**
   * CTA button URL
   * @default "#contact"
   */
  ctaUrl?: string;

  /**
   * Section image
   */
  image?: ImageWidget;

  /**
   * Image alt text
   */
  imageAlt?: string;

  /**
   * Additional CSS classes
   */
  class?: string;
}

export default function ImageTextSection({
  badgeText = "Sobre",
  title = "Conheça nossa <span class='text-vermelho'>plataforma</span>",
  description =
    "Nossa plataforma foi desenvolvida para ajudar empresas a adotarem IA de forma rápida e eficiente, com resultados mensuráveis desde o primeiro dia.",
  ctaText = "Saiba mais",
  ctaUrl = "#contact",
  image = "https://placehold.co/800x600/282B2E/FFFFFF?text=Platform+Image",
  imageAlt = "Carcará Platform",
  class: className = "",
}: ImageTextSectionProps) {
  return (
    <section
      id="platform"
      className={`relative w-full bg-ca-900 overflow-hidden ${className}`}
    >
      <ContentContainer className="py-8 px-4 sm:px-16 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>

            <h2
              className="text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <Body class="text-ca-300">
              {description}
            </Body>

            <Button
              href={ctaUrl}
              variant="primary"
              size="md"
              class="w-fit"
            >
              {ctaText}
            </Button>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src={image}
              alt={imageAlt}
              width={600}
              height={600}
              class="w-full aspect-square object-cover rounded-lg"
            />
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
