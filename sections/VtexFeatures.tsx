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
   * @description Name of a Material Symbols icon (e.g., "inventory", "analytics", "category", "settings", "person")
   */
  icon?: string;
}

export interface VtexFeaturesProps {
  /**
   * @title Badge text
   * @default "Funcionalidades"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @format rich-text
   * @default "Maximize sua operação <span class='text-vermelho'>VTEX</span>"
   */
  title?: string;

  /**
   * @title Section Description
   * @default "Seu AI Agent conectado à sua loja VTEX oferece um conjunto completo de funcionalidades para otimizar sua gestão, mantendo total controle de custos."
   */
  description?: string;

  /**
   * @title Budget Card Title
   * @default "Controle Total de Custos"
   */
  budgetTitle?: string;

  /**
   * @title Budget Message
   * @default "Defina um limite máximo de gastos para seu AI Agent e mantenha o controle total de custos de uso da plataforma"
   */
  budgetMessage?: string;

  /**
   * @title Budget Icon
   */
  budgetIcon?: ImageWidget;

  /**
   * @title Budget Card Background Image
   * @description Background image displayed at the right side of the budget card
   */
  budgetBackgroundImage?: ImageWidget;

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

export default function VtexFeatures({
  badgeText = "Funcionalidades",
  title = "Maximize sua operação <span class='text-vermelho'>VTEX</span>",
  description =
    "Seu AI Agent conectado à sua loja VTEX oferece um conjunto completo de funcionalidades para otimizar sua gestão, mantendo total controle de custos.",
  budgetTitle = "Controle Total de Custos",
  budgetMessage =
    "Defina um limite máximo de gastos para seu AI Agent e mantenha o controle total de custos de uso da plataforma",
  budgetIcon,
  budgetBackgroundImage,
  features = [
    {
      id: "estoque",
      title: "Gestão de Estoque",
      description:
        "Monitore níveis de estoque, receba alertas de baixo estoque e faça pedidos de reposição automaticamente.",
    },
    {
      id: "vendas",
      title: "Análise de Vendas",
      description:
        "Acompanhe as vendas em tempo real, identifique tendências e receba insights sobre o desempenho da loja.",
    },
    {
      id: "catalogo",
      title: "Gerenciamento de Catálogo",
      description:
        "Atualize produtos, preços e categorias com comandos simples, sem precisar navegar pelo admin.",
    },
    {
      id: "configuracao",
      title: "Configuração da Loja",
      description:
        "Altere configurações da loja, ajuste políticas e atualize informações sem acessar painéis complexos.",
    },
    {
      id: "clientes",
      title: "Insights de Clientes",
      description:
        "Obtenha informações sobre o comportamento dos clientes, segmentação e histórico de compras.",
    },
  ],
  ctaText = "Conheça mais possibilidades",
  ctaUrl = "/contato",
  class: className = "",
}: VtexFeaturesProps) {
  // Map old feature IDs to Material Symbols icon names
  const featureIconMapping = {
    estoque: "inventory",
    vendas: "trending_up",
    catalogo: "category",
    configuracao: "settings",
    clientes: "person",
  };

  // Render feature icon using Material Symbols
  const renderFeatureIcon = (feature: Feature) => {
    let iconName = feature.icon;

    // If no icon is specified, try to use the mapping based on feature ID
    if (!iconName && feature.id) {
      iconName =
        featureIconMapping[feature.id as keyof typeof featureIconMapping];
    }

    // Use a default icon if none is specified
    if (!iconName) {
      iconName = "analytics";
    }

    return (
      <span
        className="material-symbols-rounded"
        style={{
          fontSize: "32px",
          fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        }}
      >
        {iconName}
      </span>
    );
  };

  // Brand colors mapping for features
  const brandColors = [
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

      {/* Budget Feature as a card - exactly as in the image */}
      <div className="w-full mt-6 sm:mt-8 md:mt-10">
        <ContentContainer>
          <div className="relative mx-auto max-w-5xl bg-ca-900 border border-ca-700 p-6 sm:p-8 md:p-10 overflow-hidden">
            {/* Background Image */}
            {budgetBackgroundImage && (
              <div className="absolute inset-y-0 right-0 h-full overflow-hidden z-0">
                <Image
                  src={budgetBackgroundImage}
                  alt=""
                  width={400}
                  height={300}
                  class="h-full w-auto object-contain object-right"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-row items-start gap-4 sm:gap-6 relative z-10">
              <div className="flex-shrink-0 mt-1">
                <span className="text-vermelho">
                  {budgetIcon
                    ? (
                      <Image
                        src={budgetIcon}
                        alt="Controle de orçamento"
                        width={24}
                        height={24}
                        class="w-8 h-8"
                      />
                    )
                    : (
                      <span
                        className="material-symbols-rounded"
                        style={{
                          fontSize: "32px",
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        payments
                      </span>
                    )}
                </span>
              </div>

              <div className="flex-1 max-w-lg">
                <h3 className="text-3xl text-ca-50 font-serif leading-tight mb-3">
                  {budgetTitle}
                </h3>
                <p className="text-ca-300 leading-relaxed">
                  {budgetMessage}
                </p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>

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
                      {renderFeatureIcon(feature)}
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
                        {renderFeatureIcon(feature)}
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
    </div>
  );
}
