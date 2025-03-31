/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import Icon from "../components/ui/Icon.tsx";
import { Body, H2 } from "../components/ui/Typography.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import {
  DecoIcon,
  SlackIcon,
  TeamsIcon,
} from "../components/ui/PlatformIcons.tsx";

interface PlatformCard {
  /**
   * @title Platform Name
   */
  name: string;

  /**
   * @title Platform Description
   */
  description: string;

  /**
   * @title Platform Icon
   * @description Icon for the platform (if using custom SVG)
   */
  icon?: ImageWidget;

  /**
   * @title Built-in Icon
   * @description Use a built-in icon from the Icon component
   */
  builtinIcon?: string;

  /**
   * @title Custom Icon Type
   * @description Type of custom icon to use (slack, teams, deco)
   */
  customIcon?: "slack" | "teams" | "deco";

  /**
   * @title Platform Link
   * @description URL to learn more about this integration
   */
  link?: string;

  /**
   * @title Link Text
   * @description Text for the platform link
   * @default "Saiba mais"
   */
  linkText?: string;

  /**
   * @title Background Color Class
   * @description Tailwind class for card accent color (e.g., "bg-azul", "bg-verde", "bg-vermelho", "bg-amarelo")
   * @default "bg-azul"
   */
  accentColor?: string;
}

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
  platforms?: PlatformCard[];

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
      builtinIcon: "WhatsApp",
      link: "/use-cases/whatsapp",
      linkText: "Ver caso de uso",
      accentColor: "bg-verde",
    },
    {
      name: "Slack",
      description:
        "Respostas instantâneas e automação de fluxos de trabalho para sua equipe direto no Slack.",
      customIcon: "slack",
      link: "/use-cases/slack",
      linkText: "Ver caso de uso",
      accentColor: "bg-azul",
    },
    {
      name: "Microsoft Teams",
      description:
        "Integração perfeita com Teams para colaboração e suporte à tomada de decisões empresariais.",
      customIcon: "teams",
      link: "/use-cases/microsoft-teams",
      linkText: "Ver caso de uso",
      accentColor: "bg-vermelho",
    },
    {
      name: "Admin deco.cx",
      description:
        "Assistente de marketing e conteúdo integrado diretamente na plataforma deco.cx.",
      customIcon: "deco",
      link: "/use-cases/decocx",
      linkText: "Ver caso de uso",
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
  // Function to render the appropriate icon based on platform configuration
  const renderPlatformIcon = (platform: PlatformCard) => {
    if (platform.builtinIcon) {
      return (
        <Icon
          id={platform.builtinIcon as any}
          size={48}
          className="text-amarelo"
        />
      );
    } else if (platform.customIcon) {
      switch (platform.customIcon) {
        case "slack":
          return <SlackIcon size={48} className="text-amarelo" />;
        case "teams":
          return <TeamsIcon size={48} className="text-amarelo" />;
        case "deco":
          return <DecoIcon size={48} className="text-amarelo" />;
      }
    } else if (platform.icon) {
      return (
        <Image
          src={platform.icon}
          alt={platform.name}
          width={48}
          height={48}
          class="object-contain"
        />
      );
    }
    return null;
  };

  return (
    <section
      className={`relative w-full bg-ca-900 overflow-hidden py-16 ${className}`}
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

      <ContentContainer className="px-4 sm:px-6 md:px-8 relative z-10">
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

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="flex flex-col bg-ca-800/50 rounded-lg p-6 border border-ca-700 hover:border-amarelo transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Accent color strip */}
              <div
                className={`absolute top-0 left-0 w-full h-1 ${
                  platform.accentColor || "bg-azul"
                } transform origin-left transition-transform duration-300 group-hover:scale-x-100`}
                style={{ transform: "scaleX(0.5)" }}
              />

              {/* Platform Icon */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                {renderPlatformIcon(platform)}
              </div>

              {/* Platform Name */}
              <h3 className="text-ca-50 text-xl font-medium mb-2">
                {platform.name}
              </h3>

              {/* Platform Description */}
              <Body class="text-ca-300 flex-grow mb-4">
                {platform.description}
              </Body>

              {/* Platform Link */}
              {platform.link && (
                <a
                  href={platform.link}
                  className="text-amarelo text-sm font-medium hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform duration-300"
                >
                  {platform.linkText || "Saiba mais"}
                  <Icon id="ArrowRight" size={16} className="ml-1" />
                </a>
              )}
            </div>
          ))}
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
