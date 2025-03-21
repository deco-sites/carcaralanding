/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";

interface MethodologyBox {
  /**
   * @title Box Title
   */
  title: string;

  /**
   * @title Box Description
   */
  description: string;

  /**
   * @title Background Color Class
   * @description Tailwind class for the box background color (e.g., "bg-azul", "bg-verde", "bg-vermelho", "bg-amarelo")
   */
  bgColor: string;
}

const defaultBoxes = {
  discovery: {
    title: "Descoberta e definição",
    description:
      "Mergulhamos no seu negócio para identificar oportunidades de alto impacto, analisando processos, dados e desafios específicos para definir o agente ideal para suas necessidades.",
    bgColor: "bg-azul",
  },
  prototyping: {
    title: "Prototipagem rápida",
    description:
      "Desenvolvemos uma solução funcional em dias, permitindo que você valide o impacto real antes de investimentos maiores e ajuste a direção com base em resultados concretos.",
    bgColor: "bg-verde",
  },
  analysis: {
    title: "Real-time Data & Analysis",
    description:
      "We build AI solutions that work exactly how you need them to, making adoption smooth and results immediate",
    bgColor: "bg-vermelho",
  },
  implementation: {
    title: "Implementação integrada",
    description:
      "Integramos perfeitamente a solução à sua infraestrutura existente, com treinamento da sua equipe e monitoramento contínuo para garantir adoção suave e maximizar o retorno.",
    bgColor: "bg-amarelo",
  },
} as const;

export interface MethodologySectionProps {
  /**
   * @title Badge Text
   * @description Text displayed in the badge above the title
   * @default "Como trabalhamos"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @description Main title of the section
   * @default "Metodologia focada em resultados rápidos"
   */
  title?: string;

  /**
   * @title CTA Text
   * @description Text for the call-to-action button
   * @default "Agende uma reunião"
   */
  ctaText?: string;

  /**
   * @title CTA URL
   * @description URL for the call-to-action button
   * @default "#agendar"
   */
  ctaUrl?: string;

  /**
   * @title Discovery Box
   * @description Content for the discovery and definition box
   */
  discoveryBox?: Partial<MethodologyBox>;

  /**
   * @title Prototyping Box
   * @description Content for the rapid prototyping box
   */
  prototypingBox?: Partial<MethodologyBox>;

  /**
   * @title Analysis Box
   * @description Content for the real-time data and analysis box
   */
  analysisBox?: Partial<MethodologyBox>;

  /**
   * @title Implementation Box
   * @description Content for the integrated implementation box
   */
  implementationBox?: Partial<MethodologyBox>;

  /**
   * @title Additional CSS classes
   */
  class?: string;
}

export default function MethodologySection({
  badgeText = "Como trabalhamos",
  title = "Metodologia focada em resultados rápidos",
  ctaText = "Agende uma reunião",
  ctaUrl = "#agendar",
  discoveryBox: discoveryBoxProps = {},
  prototypingBox: prototypingBoxProps = {},
  analysisBox: analysisBoxProps = {},
  implementationBox: implementationBoxProps = {},
  class: className = "",
}: MethodologySectionProps) {
  // Merge default values with CMS props
  const discoveryBox = { ...defaultBoxes.discovery, ...discoveryBoxProps };
  const prototypingBox = {
    ...defaultBoxes.prototyping,
    ...prototypingBoxProps,
  };
  const analysisBox = { ...defaultBoxes.analysis, ...analysisBoxProps };
  const implementationBox = {
    ...defaultBoxes.implementation,
    ...implementationBoxProps,
  };

  return (
    <section
      className={`relative w-full bg-ca-900 overflow-hidden ${className}`}
    >
      <ContentContainer className="py-8 px-4 sm:px-16 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col justify-start items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Header Section */}
          <div className="w-full max-w-[632px] mx-auto flex flex-col justify-start items-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-0">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>

            <h2 className="text-center text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif leading-tight">
              {title}
            </h2>

            <Button
              href={ctaUrl}
              variant="primary"
              size="md"
              class="w-full sm:w-auto"
            >
              {ctaText}
            </Button>
          </div>

          {/* Bento Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 sm:gap-6">
            {/* First Column (3 spans) */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-4 sm:gap-6 ">
              {/* Top Row (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div
                  className={`p-4 sm:p-5 md:p-6 ${discoveryBox.bgColor} flex flex-col justify-end items-start gap-3 sm:gap-4 min-h-[280px] sm:min-h-[320px] md:min-h-[380px]`}
                >
                  <h3 className="text-ca-50 text-2xl sm:text-2xl md:text-3xl font-normal">
                    {discoveryBox.title}
                  </h3>
                  <p className="text-ca-100 text-sm sm:text-base leading-normal">
                    {discoveryBox.description}
                  </p>
                </div>
                <div
                  className={`p-4 sm:p-5 md:p-6 ${prototypingBox.bgColor} flex flex-col justify-end items-start gap-3 sm:gap-4 min-h-[280px] sm:min-h-[320px] md:min-h-[380px]`}
                >
                  <h3 className="text-ca-50 text-2xl sm:text-2xl md:text-3xl font-normal">
                    {prototypingBox.title}
                  </h3>
                  <p className="text-ca-100 text-sm sm:text-base leading-normal">
                    {prototypingBox.description}
                  </p>
                </div>
              </div>
              {/* Bottom Row */}
              <div
                className={`p-4 sm:p-5 md:p-6 ${analysisBox.bgColor} flex flex-col justify-end items-start gap-3 sm:gap-4 min-h-[200px] sm:min-h-[220px] md:min-h-[256px]`}
              >
                <h3 className="text-ca-50 text-2xl sm:text-2xl md:text-3xl font-normal">
                  {analysisBox.title}
                </h3>
                <p className="text-ca-100 text-sm sm:text-base leading-normal">
                  {analysisBox.description}
                </p>
              </div>
            </div>

            {/* Second Column (4 spans - tall yellow box) */}
            <div
              className={`lg:col-span-3 p-4 sm:p-5 md:p-6 ${implementationBox.bgColor} flex flex-col justify-end items-start gap-3 sm:gap-4 min-h-[280px] sm:min-h-[320px] md:min-h-[637px] lg:min-h-[760px]`}
            >
              <h3 className="text-ca-50 text-2xl sm:text-2xl md:text-3xl font-normal">
                {implementationBox.title}
              </h3>
              <p className="text-ca-100 text-sm sm:text-base leading-normal">
                {implementationBox.description}
              </p>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
