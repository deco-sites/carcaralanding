/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import { Body } from "../components/ui/Typography.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import PlatformTabs, { PlatformIntegration } from "../islands/PlatformTabs.tsx";

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

export interface IntegrationPlatformsSectionProps {
  /**
   * @title Badge Text
   * @description Text displayed in the badge above the title
   * @default "Onde Utilizar"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @description Main title of the section
   * @default "Integre seu AI Agent em diversas plataformas"
   */
  title?: string;

  /**
   * @title Section Description
   * @description Descriptive text below the title
   * @default "Conecte seu AI Agent onde sua equipe já trabalha, automatizando tarefas e fornecendo respostas em tempo real."
   */
  description?: string;

  /**
   * @title CTA Text
   * @description Text for the call-to-action button
   * @default "Comece agora"
   */
  ctaText?: string;

  /**
   * @title CTA URL
   * @description URL for the call-to-action button
   * @default "/contato"
   */
  ctaUrl?: string;

  /**
   * @title Platforms
   * @description List of platforms where AI Agent can be integrated
   */
  platforms?: PlatformIntegration[];

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
   * @title Additional CSS classes
   */
  class?: string;
}

export default function IntegrationPlatformsSection({
  badgeText = "Onde Utilizar",
  title = "Integre seu AI Agent em diversas plataformas",
  description =
    "Conecte seu AI Agent onde sua equipe já trabalha, automatizando tarefas e fornecendo respostas em tempo real.",
  ctaText = "Comece agora",
  ctaUrl = "/contato",
  platforms = [
    {
      name: "WhatsApp",
      description:
        "Atendimento automatizado 24/7 com respostas personalizadas para seus clientes via WhatsApp.",
      benefits: [
        "Suporte ao cliente 24/7 sem intervenção humana",
        "Respostas personalizadas baseadas no contexto",
        "Automação de processos de venda e pós-venda",
      ],
      builtinIcon: "WhatsApp",
      icon: "",
      interfacePreview:
        "https://placehold.co/600x400/282B2E/CCCCCC?text=WhatsApp+AI+Interface",
      accentColor: "bg-verde",
    },
    {
      name: "Slack",
      description:
        "Respostas instantâneas e automação de fluxos de trabalho para sua equipe direto no Slack.",
      benefits: [
        "Automatização de tarefas administrativas",
        "Resposta a perguntas frequentes sobre dados internos",
        "Integração com outras ferramentas da empresa",
      ],
      customIcon: "slack",
      icon: "",
      interfacePreview:
        "https://placehold.co/600x400/282B2E/CCCCCC?text=Slack+AI+Interface",
      accentColor: "bg-azul",
    },
    {
      name: "Microsoft Teams",
      description:
        "Integração perfeita com Teams para colaboração e suporte à tomada de decisões empresariais.",
      benefits: [
        "Agendamento inteligente de reuniões",
        "Sumários automáticos de discussões",
        "Pesquisa de dados e documentos corporativos",
      ],
      customIcon: "teams",
      icon: "",
      interfacePreview:
        "https://placehold.co/600x400/282B2E/CCCCCC?text=Teams+AI+Interface",
      accentColor: "bg-vermelho",
    },
    {
      name: "Admin deco.cx",
      description:
        "Assistente de marketing e conteúdo integrado diretamente na plataforma deco.cx.",
      benefits: [
        "Criação de conteúdo otimizado para SEO",
        "Análise de performance de páginas",
        "Sugestões de melhorias baseadas em dados",
      ],
      customIcon: "deco",
      icon: "",
      interfacePreview:
        "https://placehold.co/600x400/282B2E/CCCCCC?text=Deco.cx+AI+Interface",
      accentColor: "bg-amarelo",
    },
  ],
  backgroundElement = {
    image: "https://placehold.co/3505x2270/282B2E/282B2E",
    opacity: 25,
    rotation: 167.02,
    top: "33%",
    position: { right: "-25%" },
    zIndex: -10,
    width: "100%",
  },
  showBackgroundElements = true,
  class: className = "",
}: IntegrationPlatformsSectionProps) {
  // Ensure platforms have benefits array
  const platformsWithBenefits = platforms.map((platform) => ({
    ...platform,
    benefits: platform.benefits || [],
  }));

  return (
    <section
      id="integrations"
      className={`relative w-full bg-ca-900 overflow-hidden py-16 md:py-24 lg:py-32 ${className}`}
    >
      {/* Decorative background element */}
      {showBackgroundElements && backgroundElement?.image && (
        <div
          className="absolute w-[100rem] sm:w-[200rem] -rotate-[8deg] top-80 sm:top-0 -right-96 md:-right-[60rem] z-0"
          style={{
            left: backgroundElement?.position?.left,
            right: backgroundElement?.position?.right,
            top: backgroundElement?.top || "33%",
            zIndex: backgroundElement?.zIndex || -10,
          }}
        >
          <Image
            src={backgroundElement.image}
            alt="Background decoration"
            width={3505}
            height={2270}
            class="w-full h-auto opacity-25"
          />
        </div>
      )}

      <ContentContainer className="px-4 sm:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
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

        {/* Platform Tabs */}
        <div className="mb-16">
          <PlatformTabs platforms={platformsWithBenefits} />
        </div>

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
