/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import { Body, H2 } from "../components/ui/Typography.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TestimonialsCarousel from "../islands/TestimonialsCarousel.tsx";

export interface BackgroundElement {
  /**
   * Background image
   */
  image: ImageWidget;

  /**
   * Opacity of the background element (0-100)
   * @default 25
   */
  opacity: number;

  /**
   * Rotation angle in degrees
   * @default 167.02
   */
  rotation: number;

  /**
   * Position from top (percentage or px)
   * @default "33%"
   */
  top: string;

  /**
   * Position from left or right (percentage or px)
   */
  position: {
    left?: string;
    right?: string;
  };

  /**
   * z-index value
   * @default -10
   */
  zIndex: number;

  /**
   * Width of the background element (percentage or px)
   * @default "100%"
   */
  width: string;
}

export interface Testimonial {
  /**
   * @title Client Name
   */
  name: string;

  /**
   * @title Client Position/Title
   */
  position: string;

  /**
   * @title Company Name
   */
  company: string;

  /**
   * @title Testimonial Text
   * @format rich-text
   */
  quote: string;

  /**
   * @title Client Avatar
   */
  avatar?: ImageWidget;

  /**
   * @title Company Logo
   */
  logo?: ImageWidget;

  /**
   * @title Accent Color
   * @description Tailwind class for color accent (e.g., "bg-vermelho", "bg-azul")
   * @default "bg-vermelho"
   */
  accentColor?: string;
}

export interface TestimonialsSectionProps {
  /**
   * @title Badge Text
   * @default "Depoimentos"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @default "O que nossos clientes estão dizendo"
   */
  title?: string;

  /**
   * @title Section Description
   * @default "Veja o que empresas que já estão utilizando nossos AI Agents dizem sobre os resultados."
   */
  description?: string;

  /**
   * @title CTA Text
   * @description Text for the call-to-action button
   * @default "Fale conosco"
   */
  ctaText?: string;

  /**
   * @title CTA URL
   * @description URL for the call-to-action button
   * @default "/contato"
   */
  ctaUrl?: string;

  /**
   * @title Testimonials
   * @description List of client testimonials
   */
  testimonials?: Testimonial[];

  /**
   * @title Background Element
   * @description Decorative background element
   */
  backgroundElement?: Partial<BackgroundElement>;

  /**
   * @title Whether to show background elements
   * @default true
   */
  showBackgroundElements?: boolean;

  /**
   * @title Auto-slide interval in milliseconds
   * @default 6000
   */
  autoSlideInterval?: number;

  /**
   * @title Additional CSS classes
   */
  class?: string;
}

export default function TestimonialsSection({
  badgeText = "Depoimentos",
  title = "O que nossos clientes estão dizendo",
  description =
    "Veja o que empresas que já estão utilizando nossos AI Agents dizem sobre os resultados.",
  ctaText = "Fale conosco",
  ctaUrl = "/contato",
  testimonials = [
    {
      name: "Representante da Osklen",
      position: "Diretor de Tecnologia",
      company: "Osklen",
      quote:
        "Acredito que esse AI Agent pode revolucionar a forma como gerenciamos nossa operação VTEX, trazendo eficiência e insights valiosos para nosso dia a dia.",
      accentColor: "bg-verde",
    },
    {
      name: "Maria Silva",
      position: "Gerente de E-commerce",
      company: "Fashion Brand",
      quote:
        "A capacidade do AI Agent de analisar nossos dados de vendas e sugerir ações estratégicas nos permitiu aumentar as conversões em 23% nos primeiros dois meses.",
      accentColor: "bg-azul",
    },
    {
      name: "Carlos Mendes",
      position: "COO",
      company: "Tech Retail",
      quote:
        "Implementamos o AI Agent em nossa operação VTEX e conseguimos reduzir em 45% o tempo gasto em tarefas operacionais rotineiras. Nossa equipe agora pode focar em estratégias de crescimento.",
      accentColor: "bg-vermelho",
    },
    {
      name: "Ana Ferreira",
      position: "Diretora de Marketing",
      company: "Home & Decor",
      quote:
        "A agilidade com que conseguimos obter insights sobre o comportamento dos nossos clientes através do AI Agent transformou nossa abordagem de marketing, tornando nossas campanhas muito mais efetivas.",
      accentColor: "bg-amarelo",
    },
  ],
  backgroundElement = {
    image: "https://placehold.co/3505x2270/282B2E/282B2E",
    opacity: 15,
    rotation: -4.51,
    top: "50%",
    position: { left: "-40%" },
    zIndex: -10,
    width: "100%",
  },
  showBackgroundElements = true,
  autoSlideInterval = 6000,
  class: className = "",
}: TestimonialsSectionProps) {
  return (
    <section
      className={`relative w-full bg-ca-900 overflow-hidden py-16 md:py-24 ${className}`}
    >
      {/* Decorative background element */}
      {showBackgroundElements && backgroundElement?.image && (
        <div
          className="absolute transform -translate-y-1/2"
          style={{
            left: backgroundElement?.position?.left,
            right: backgroundElement?.position?.right,
            top: backgroundElement?.top || "50%",
            zIndex: backgroundElement?.zIndex || -10,
            opacity: (backgroundElement?.opacity || 15) / 100,
            transform: `translate(-50%, -50%) rotate(${
              backgroundElement?.rotation || 0
            }deg)`,
            width: backgroundElement?.width || "100%",
          }}
        >
          <Image
            src={backgroundElement.image}
            alt="Background decoration"
            width={3505}
            height={2270}
            class="w-full h-auto"
          />
        </div>
      )}

      <ContentContainer className="px-4 sm:px-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Badge
            variant="outline"
            color="secondary"
            withDot={true}
            dotColor="primary"
          >
            {badgeText}
          </Badge>

          <h2 className="mt-4 text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif leading-tight">
            {title}
          </h2>

          <Body class="mt-4 text-ca-300 max-w-2xl">
            {description}
          </Body>
        </div>

        {/* Testimonials Carousel - Island component for client-side interactivity */}
        <TestimonialsCarousel
          testimonials={testimonials}
          autoSlideInterval={autoSlideInterval}
        />

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            href={ctaUrl}
            variant="primary"
            size="md"
          >
            {ctaText}
          </Button>
        </div>
      </ContentContainer>
    </section>
  );
}
