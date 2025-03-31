/** @jsxImportSource preact */
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";

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
   * @default "Funcionalidades <span class='text-vermelho'>Poderosas</span>"
   */
  title?: string;

  /**
   * @title Section Description
   * @default "O AI Agent VTEX oferece um conjunto completo de funcionalidades para otimizar a gestão de sua loja."
   */
  description?: string;

  /**
   * @title Features
   * @description List of features to display
   */
  features?: Feature[];

  /**
   * @title Number of columns on desktop
   * @default 3
   */
  columns?: 2 | 3;

  /**
   * @title Additional CSS classes
   */
  class?: string;
}

export default function VtexFeatures({
  badgeText = "Funcionalidades",
  title = "Funcionalidades <span class='text-vermelho'>Poderosas</span>",
  description =
    "O AI Agent VTEX oferece um conjunto completo de funcionalidades para otimizar a gestão de sua loja.",
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
  columns = 3,
  class: className = "",
}: VtexFeaturesProps) {
  // Determine grid columns class
  const gridColumnsClass = columns === 2
    ? "md:grid-cols-1 lg:grid-cols-2"
    : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="features"
      className={`relative w-full py-16 sm:py-20 md:py-24 bg-ca-900 ${className}`}
    >
      <ContentContainer className="px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            color="secondary"
            withDot={true}
            dotColor="primary"
          >
            {badgeText}
          </Badge>

          <h1
            className="text-4xl md:text-5xl font-serif text-ca-50 mt-6 mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p className="max-w-3xl mx-auto text-ca-300">
            {description}
          </p>
        </div>

        <div className={`grid grid-cols-1 ${gridColumnsClass} gap-6 md:gap-8`}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-ca-800 rounded-lg border border-ca-700 p-6"
            >
              <h3 className="text-xl font-bold text-ca-50 mb-4">
                {feature.title}
              </h3>

              <p className="text-ca-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-ca-300 italic max-w-2xl mx-auto">
            O AI Agent opera dentro do seu orçamento predefinido, garantindo
            controle total de custos.
          </p>
        </div>
      </ContentContainer>
    </section>
  );
}
