/** @jsxImportSource preact */
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Body, Eyebrow, HeroTitle } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import AgentConversation from "../islands/AgentConversation.tsx";

export interface BackgroundElement {
  /**
   * Background image
   */
  image: ImageWidget;

  /**
   * Opacity of the background element (0-100)
   * @default 25 for first element, 100 for second element
   */
  opacity: number;

  /**
   * Rotation angle in degrees
   * @default 167.02 for first element, -4.51 for second element
   */
  rotation: number;

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

  /**
   * Width of the background element (percentage or px)
   * @default "100%" by default, "66%" for large screens for first element, "100%" for second element
   */
  width: string;
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

export interface AgentHeroProps {
  /**
   * @format rich-text
   * @default Eleve seu <span class='text-vermelho'>Atendimento ao Cliente</span> com Precisão Impulsionada por IA
   */
  title?: string;

  /**
   * @default O AI Agent ajuda sua equipe a fornecer um atendimento mais rápido e personalizado, analisando e gerando respostas especializadas.
   */
  description?: string;

  /**
   * @default AI Agent
   */
  badge?: string;

  /**
   * Primary CTA text
   * @default Iniciar Avaliação Gratuita
   */
  primaryCtaText?: string;

  /**
   * Primary CTA URL
   * @default #cta-final
   */
  primaryCtaHref?: string;

  /**
   * Secondary CTA text
   * @default Agendar Demo
   */
  secondaryCtaText?: string;

  /**
   * Secondary CTA URL
   * @default #features
   */
  secondaryCtaHref?: string;

  /**
   * Chat title
   * @default AI Agent
   */
  chatTitle?: string;

  /**
   * Chat subtitle
   * @default Sempre disponível
   */
  chatSubtitle?: string;

  /**
   * Chat placeholder text
   * @default Digite sua mensagem...
   */
  chatPlaceholder?: string;

  /**
   * Chat messages to display in the interface
   */
  conversation?: ConversationMessage[];

  /**
   * Chat icon image
   * @default https://placehold.co/200x200/B13431/FFFFFF?text=AI
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
   * Edit button text
   * @default Editar
   */
  editBtnText?: string;

  /**
   * Send response button text
   * @default Enviar Resposta
   */
  sendBtnText?: string;

  /**
   * Custom CSS classes for the conversation interface
   */
  conversationClass?: string;
}

export default function AgentHero({
  title =
    "Eleve seu <span class='text-vermelho'>Atendimento ao Cliente</span> com Precisão Impulsionada por IA",
  description =
    "O AI Agent ajuda sua equipe a fornecer um atendimento mais rápido e personalizado, analisando e gerando respostas especializadas.",
  badge = "AI Agent",
  primaryCtaText = "Iniciar Avaliação Gratuita",
  primaryCtaHref = "#cta-final",
  secondaryCtaText = "Agendar Demo",
  secondaryCtaHref = "#features",
  chatTitle = "AI Agent",
  chatSubtitle = "Sempre disponível",
  chatPlaceholder = "Digite sua mensagem...",
  chatIcon = "https://placehold.co/200x200/B13431/FFFFFF?text=AI",
  conversation = [
    {
      message:
        "Olá, fiz um pedido (#ORD-9283) na semana passada e não recebi nenhuma atualização. Você poderia me informar onde está meu pacote? Obrigado.",
      fromAI: false,
    },
    {
      message:
        "Olá! Acabei de verificar seu pedido (#ORD-9283) e posso ver que ele foi enviado ontem via Expresso. Seu número de rastreamento é TRK-82931, e atualmente está em trânsito saindo do nosso centro de distribuição. A entrega estimada é amanhã antes das 20h. Você pode acompanhar em tempo real no [link de rastreamento]. Me avise se precisar de mais alguma coisa!",
      fromAI: true,
    },
  ],
  backgroundElement1 = {
    image: "https://placehold.co/1953x1265/282B2E/282B2E",
    opacity: 25,
    rotation: 167.02,
    top: "33%",
    position: { right: "0" },
    zIndex: -10,
    width: "100%",
  },
  backgroundElement2 = {
    image: "https://placehold.co/3505x2270/B13431/B13431",
    opacity: 100,
    rotation: -4.51,
    top: "12px",
    position: { left: "-25%" },
    zIndex: -20,
    width: "100%",
  },
  showBackgroundElements = true,
  editBtnText = "Editar",
  sendBtnText = "Enviar Resposta",
  conversationClass = "",
}: AgentHeroProps) {
  return (
    <section
      className="relative w-full bg-ca-900 overflow-hidden"
      id="agent-hero"
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

          {/* Right column - Conversation Interface - Order 2 on mobile */}
          <div className="w-full md:w-1/2 order-2 flex flex-col">
            {/* Use island component for conversation animations */}
            <div
              className={`bg-ca-900 border border-ca-700/80 shadow-xl p-3 sm:p-4 md:p-5 w-full mx-auto flex flex-col h-full ${conversationClass}`}
            >
              <AgentConversation
                chatTitle={chatTitle}
                chatSubtitle={chatSubtitle}
                chatPlaceholder={chatPlaceholder}
                chatMessages={conversation}
                chatIcon={chatIcon}
              />
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
