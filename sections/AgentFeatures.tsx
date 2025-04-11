/** @jsxImportSource preact */
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import { Body, Eyebrow } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Head } from "$fresh/runtime.ts";

export interface Feature {
  /**
   * @title Feature ID
   */
  id: string;

  /**
   * @title Feature Title
   */
  title: string;

  /**
   * @title Feature Description
   */
  description: string;

  /**
   * @title Material Design Icon
   * @description Name of a Material Symbols icon (e.g., "support_agent", "psychology", "integration_instructions")
   */
  icon?: string;
}

export interface SACAgentFeaturesProps {
  /**
   * @title Badge text
   * @default "Funcionalidades"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @format rich-text
   * @default "Transforme seu <span class='text-vermelho'>Suporte ao Cliente</span>"
   */
  title?: string;

  /**
   * @title Section Description
   * @default "Seu AI Agent SAC oferece um conjunto completo de funcionalidades para otimizar o atendimento ao cliente, reduzindo tempo de resposta e aumentando a satisfação."
   */
  description?: string;

  /**
   * @title Features
   * @description List of features to display
   */
  features?: Feature[];

  /**
   * @title CTA Text
   * @default "Conheça mais possibilidades"
   */
  ctaText?: string;

  /**
   * @title CTA URL
   * @default "/contato"
   */
  ctaUrl?: string;

  /**
   * @title Additional CSS classes
   */
  class?: string;
}

export default function SACAgentFeatures({
  badgeText = "Funcionalidades",
  title =
    "Transforme seu <span class='text-vermelho'>Suporte ao Cliente</span>",
  description =
    "Seu AI Agent SAC oferece um conjunto completo de funcionalidades para otimizar o atendimento ao cliente, reduzindo tempo de resposta e aumentando a satisfação.",
  features = [
    {
      id: "analysis",
      title: "Smart Ticket Analysis",
      description:
        "Automaticamente analisa o conteúdo, assunto e histórico dos tickets para entender as necessidades do cliente.",
      icon: "support_agent",
    },
    {
      id: "intent",
      title: "Intent Recognition",
      description:
        "Identifica com precisão as intenções do cliente, como rastrear pedidos, solicitar devoluções ou questionar sobre produtos.",
      icon: "psychology",
    },
    {
      id: "integration",
      title: "System Integration",
      description:
        "Conecta-se perfeitamente aos seus sistemas existentes para buscar informações precisas e em tempo real.",
      icon: "integration_instructions",
    },
    {
      id: "response",
      title: "Response Generation",
      description:
        "Cria respostas personalizadas que se alinham com o tom e as diretrizes de voz da sua marca.",
      icon: "smart_toy",
    },
    {
      id: "access",
      title: "Role-Based Access",
      description:
        "Define diferentes níveis de permissão para agentes, supervisores e administradores.",
      icon: "admin_panel_settings",
    },
    {
      id: "analytics",
      title: "Real-time Analytics",
      description:
        "Monitora métricas de desempenho e obtém insights para melhorar continuamente o suporte ao cliente.",
      icon: "monitoring",
    },
    {
      id: "priority",
      title: "Priority Detection",
      description:
        "Determina automaticamente a prioridade do ticket com base no conteúdo, histórico do cliente e análise de sentimento.",
      icon: "priority_high",
    },
    {
      id: "knowledge",
      title: "Knowledge Integration",
      description:
        "Conecta-se à sua base de conhecimento para fornecer informações precisas e consistentes em todos os canais.",
      icon: "library_books",
    },
    {
      id: "workflow",
      title: "Workflow Automation",
      description:
        "Define processos e fluxos de trabalho personalizados para lidar com tarefas repetitivas de forma eficiente.",
      icon: "autorenew",
    },
  ],
  ctaText = "Conheça mais possibilidades",
  ctaUrl = "/contato",
  class: className = "",
}: SACAgentFeaturesProps) {
  // Brand colors mapping for features
  const brandColors = [
    { text: "text-vermelho", bg: "bg-vermelho/10" },
    { text: "text-verde", bg: "bg-verde/10" },
    { text: "text-azul", bg: "bg-azul/10" },
    { text: "text-amarelo", bg: "bg-amarelo/10" },
    { text: "text-vermelho", bg: "bg-vermelho/10" },
    { text: "text-verde", bg: "bg-verde/10" },
    { text: "text-azul", bg: "bg-azul/10" },
    { text: "text-amarelo", bg: "bg-amarelo/10" },
    { text: "text-vermelho", bg: "bg-vermelho/10" },
  ];

  // Get color for a feature (consistent based on index)
  const getFeatureColor = (index: number) => {
    return brandColors[index % brandColors.length];
  };

  return (
    <div
      id="features"
      className={`w-full bg-ca-900 md:!pb-0 py-8 sm:py-10 md:py-16 lg:pt-20 overflow-hidden ${className}`}
    >
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
        />
        <style>
          {`
            .material-symbols-rounded {
              font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
          `}
        </style>
      </Head>

      <ContentContainer>
        <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="w-full max-w-4xl flex flex-col justify-start items-center gap-3 sm:gap-4 md:gap-6">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>

            <h1
              class="text-center font-serif text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <Body class="text-center max-w-[280px] sm:max-w-sm md:max-w-md text-ca-300 px-4 sm:px-0">
              {description}
            </Body>

            <div className="mt-4 md:mt-6">
              <Button href={ctaUrl} variant="primary" size="lg">
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </ContentContainer>

      {/* Features in ResultsSection-like Layout */}
      <div className="w-full border-t border-ca-700 mt-6 sm:mt-8 md:mt-10">
        <ContentContainer className="flex flex-col gap-6 md:gap-0 md:flex-row">
          {features.slice(0, 3).map((feature, index) => {
            const featureColor = getFeatureColor(index);

            return (
              <>
                <div
                  key={`feature-${index}`}
                  className="flex-1 self-stretch p-4 sm:p-6 md:p-10 lg:p-15 lg:py-20 flex flex-col justify-center items-start gap-4"
                >
                  {/* Icon alone at the top */}
                  <div className="self-stretch mb-2">
                    <span className={`${featureColor.text} block`}>
                      <span
                        className="material-symbols-rounded"
                        style={{
                          fontSize: "32px",
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        {feature.icon || "support_agent"}
                      </span>
                    </span>
                  </div>

                  {/* Title, divider, and description grouped together */}
                  <div className="self-stretch flex flex-col gap-3">
                    <h3 className="text-ca-50 text-3xl font-serif leading-tight">
                      {feature.title}
                    </h3>
                    <div className="self-stretch h-px bg-ca-700" />
                    <p class="text-ca-300 text-base font-normal leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
                {index < features.slice(0, 3).length - 1 && (
                  <div className="hidden md:block w-px self-stretch border-r border-ca-700">
                  </div>
                )}
              </>
            );
          })}
        </ContentContainer>
      </div>

      {features.length > 3 && (
        <div className="w-full border-t border-ca-700">
          <ContentContainer className="flex flex-col gap-6 md:gap-0 md:flex-row">
            {features.slice(3, 6).map((feature, index) => {
              const featureColor = getFeatureColor(index + 3);

              return (
                <>
                  <div
                    key={`feature-${index + 3}`}
                    className="flex-1 self-stretch p-4 sm:p-6 md:p-10 lg:p-15 lg:py-20 flex flex-col justify-center items-start gap-4"
                  >
                    {/* Icon alone at the top */}
                    <div className="self-stretch mb-2">
                      <span className={`${featureColor.text} block`}>
                        <span
                          className="material-symbols-rounded"
                          style={{
                            fontSize: "32px",
                            fontVariationSettings:
                              "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                          }}
                        >
                          {feature.icon || "support_agent"}
                        </span>
                      </span>
                    </div>

                    {/* Title, divider, and description grouped together */}
                    <div className="self-stretch flex flex-col gap-3">
                      <h3 className="text-ca-50 text-3xl font-serif leading-tight">
                        {feature.title}
                      </h3>
                      <div className="self-stretch h-px bg-ca-700" />
                      <p class="text-ca-300 text-base font-normal leading-6">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {index + 3 < features.length - 1 && index < 2 && (
                    <div className="hidden md:block w-px self-stretch border-r border-ca-700">
                    </div>
                  )}
                </>
              );
            })}
          </ContentContainer>
        </div>
      )}

      {features.length > 6 && (
        <div className="w-full border-t border-ca-700">
          <ContentContainer className="flex flex-col gap-6 md:gap-0 md:flex-row">
            {features.slice(6, 9).map((feature, index) => {
              const featureColor = getFeatureColor(index + 6);

              return (
                <>
                  <div
                    key={`feature-${index + 6}`}
                    className="flex-1 self-stretch p-4 sm:p-6 md:p-10 lg:p-15 lg:py-20 flex flex-col justify-center items-start gap-4"
                  >
                    {/* Icon alone at the top */}
                    <div className="self-stretch mb-2">
                      <span className={`${featureColor.text} block`}>
                        <span
                          className="material-symbols-rounded"
                          style={{
                            fontSize: "32px",
                            fontVariationSettings:
                              "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                          }}
                        >
                          {feature.icon || "support_agent"}
                        </span>
                      </span>
                    </div>

                    {/* Title, divider, and description grouped together */}
                    <div className="self-stretch flex flex-col gap-3">
                      <h3 className="text-ca-50 text-3xl font-serif leading-tight">
                        {feature.title}
                      </h3>
                      <div className="self-stretch h-px bg-ca-700" />
                      <p class="text-ca-300 text-base font-normal leading-6">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {index + 6 < features.length - 1 && index < 2 && (
                    <div className="hidden md:block w-px self-stretch border-r border-ca-700">
                    </div>
                  )}
                </>
              );
            })}
          </ContentContainer>
        </div>
      )}
    </div>
  );
}
