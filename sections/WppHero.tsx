/** @jsxImportSource preact */
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Body } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import WppConversation from "../islands/WppConversation.tsx";

export interface BackgroundElement {
  /**
   * Background image
   */
  image: ImageWidget;

  /**
   * Position from top (percentage or px)
   * @default "33%" for first element, "12px" for second element
   */
  top: string;

  /**
   * Position from left or right (percentage or px)
   * @default { right: "0" } for first element, { left: "-25%" } for second element
   */
  position: {
    left?: string;
    right?: string;
  };

  /**
   * z-index value
   * @default -10 for first element, -20 for second element
   */
  zIndex: number;
}

export interface ConversationMessage {
  /**
   * The content of the message
   */
  message: string;

  /**
   * Whether the message is from the AI (true) or user (false)
   */
  fromAI: boolean;

  /**
   * Whether the message has a list of items
   */
  hasList?: boolean;

  /**
   * List items if hasList is true
   */
  listItems?: string[];

  /**
   * Additional message to show after list items
   */
  afterListMessage?: string;
}

export interface WppHeroProps {
  /**
   * @format rich-text
   * @default Otimize seu <span class='text-verde'>WhatsApp</span> com Inteligência Artificial
   */
  title?: string;

  /**
   * @default Automatize respostas, qualifique leads e aumente suas vendas com um assistente virtual inteligente integrado ao seu WhatsApp Business.
   */
  description?: string;

  /**
   * @default AI Agent WhatsApp
   */
  badge?: string;

  /**
   * Primary CTA text
   * @default Começar Agora
   */
  primaryCtaText?: string;

  /**
   * Primary CTA URL
   * @default #cta-final
   */
  primaryCtaHref?: string;

  /**
   * Secondary CTA text
   * @default Ver Demo
   */
  secondaryCtaText?: string;

  /**
   * Secondary CTA URL
   * @default #demo
   */
  secondaryCtaHref?: string;

  /**
   * Chat title
   * @default AI Agent WhatsApp
   */
  chatTitle?: string;

  /**
   * Chat subtitle
   * @default Sempre disponível
   */
  chatSubtitle?: string;

  /**
   * Chat icon image
   * @default https://placehold.co/200x200/25D366/FFFFFF?text=AI
   */
  chatIcon?: ImageWidget;

  /**
   * First background decorative element (upper right)
   */
  backgroundElement1?: Partial<BackgroundElement>;

  /**
   * Second background decorative element (lower left)
   */
  backgroundElement2?: Partial<BackgroundElement>;

  /**
   * Whether to show background elements
   * @default true
   */
  showBackgroundElements?: boolean;

  /**
   * Custom CSS classes for the conversation interface
   */
  conversationClass?: string;
}

export default function WppHero({
  title =
    "Otimize seu <span class='text-verde'>WhatsApp</span> com Inteligência Artificial",
  description =
    "Automatize respostas, qualifique leads e aumente suas vendas com um assistente virtual inteligente integrado ao seu WhatsApp Business.",
  badge = "AI Agent WhatsApp",
  primaryCtaText = "Começar Agora",
  primaryCtaHref = "#cta-final",
  secondaryCtaText = "Ver Demo",
  secondaryCtaHref = "#demo",
  chatTitle = "AI Agent WhatsApp",
  chatSubtitle = "Sempre disponível",
  chatIcon = "https://placehold.co/200x200/25D366/FFFFFF?text=AI",
  backgroundElement1 = {
    image: "https://placehold.co/1953x1265/282B2E/282B2E",
    top: "33%",
    position: { right: "0" },
    zIndex: -10,
  },
  backgroundElement2 = {
    image: "https://placehold.co/3505x2270/25D366/25D366",
    top: "12px",
    position: { left: "-25%" },
    zIndex: -20,
  },
  showBackgroundElements = true,
  conversationClass = "",
}: WppHeroProps) {
  return (
    <section
      className="relative w-full bg-ca-900 overflow-hidden"
      id="wpp-hero"
    >
      {/* Decorative background elements - positioned with proper z-index */}
      {showBackgroundElements && (
        <>
          <div
            className="absolute w-[100rem] sm:w-[200rem] -rotate-[8deg] top-80 sm:top-0 -right-96 md:-right-[60rem] z-0"
            style={{
              left: backgroundElement1?.position?.left,
            }}
          >
            {backgroundElement1?.image && (
              <Image
                src={backgroundElement1.image}
                alt="Background decoration"
                width={1953}
                height={1265}
                class="w-full h-auto"
              />
            )}
          </div>
          <div
            className="absolute -top-[50rem] sm:-top-[90rem] sm:w-[200rem] w-[100rem] -rotate-[8deg] -left-96 sm:-left-[44rem] z-0"
            style={{
              right: backgroundElement2?.position?.right,
            }}
          >
            {backgroundElement2?.image && (
              <Image
                src={backgroundElement2.image}
                alt="Background decoration"
                width={3505}
                height={2270}
                class="w-full h-auto"
              />
            )}
          </div>
        </>
      )}

      {/* Content container that follows the same grid as other sections */}
      <ContentContainer className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-8">
          {/* Left column - Stacked text content - Always order 1 on mobile */}
          <div className="w-full md:w-1/2 order-1 flex flex-col">
            <div className="hero-content flex flex-col items-center md:items-start gap-4 sm:gap-6">
              {/* Badge */}
              <Badge
                variant="outline"
                color="secondary"
                size="md"
                withDot={true}
                dotColor="primary"
              >
                {badge}
              </Badge>

              {/* Title */}
              <h1
                className="hero-title font-serif text-4xl sm:text-5xl lg:text-[5.25rem] text-ca-50 tracking-[-0.01em] text-center md:text-left w-full"
                dangerouslySetInnerHTML={{
                  __html:
                    `<div class="space-y-0 leading-[1.1] md:leading-[1.1]">${title}</div>`,
                }}
              />

              {/* Description */}
              <Body class="text-center md:text-left text-ca-300 max-w-xs sm:max-w-lg">
                {description}
              </Body>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 mt-2 sm:mt-4">
                <Button
                  href={primaryCtaHref}
                  variant="primary"
                  size="md"
                >
                  {primaryCtaText}
                </Button>

                <Button
                  href={secondaryCtaHref}
                  variant="outline"
                  size="md"
                >
                  {secondaryCtaText}
                </Button>
              </div>
            </div>
          </div>

          {/* Right column - WhatsApp Conversation Interface - Order 2 on mobile */}
          <div className="w-full md:w-1/2 order-2 flex flex-col">
            {/* Use island component for conversation animations */}
            <div
              className={`bg-ca-900 border border-ca-700/80 shadow-xl p-3 sm:p-4 md:p-5 w-full mx-auto flex flex-col h-full ${conversationClass}`}
            >
              <WppConversation
                key="wpp-conversation"
                chatTitle={chatTitle}
                chatSubtitle={chatSubtitle}
                chatIcon={chatIcon}
              />
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
