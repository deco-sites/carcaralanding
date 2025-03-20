import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import { ContentContainer } from "../components/Layout.tsx";

interface Service {
  /**
   * Service title
   */
  title: string;

  /**
   * Service subtitle
   */
  subtitle: string;

  /**
   * Service description
   */
  description: string;

  /**
   * Service image
   */
  image: ImageWidget;

  /**
   * Button text
   * @default "Saiba mais"
   */
  buttonText?: string;

  /**
   * Button link
   */
  buttonLink?: string;
}

interface ServicesSectionProps {
  /**
   * Section badge text
   * @default "Serviços"
   */
  badgeText?: string;

  /**
   * Section title
   * @default "Soluções que estão mudando o jogo"
   */
  title?: string;

  /**
   * List of services
   */
  services?: Service[];

  /**
   * Auto-rotate interval in milliseconds
   * @default 5000
   */
  autoRotateInterval?: number;
}

function ServicesSection({
  badgeText = "Serviços",
  title = "Soluções que estão mudando o jogo",
  services = [
    {
      title: "CMS Generativo",
      subtitle: "Conteúdo inteligente e escalável",
      description:
        "Transforme sua criação de conteúdo com um sistema que gera, gerencia e otimiza textos automaticamente, mantendo sua identidade de marca e aumentando significativamente sua produtividade.",
      image: "https://placehold.co/748x760",
      buttonText: "Saiba mais",
      buttonLink: "/servicos/cms-generativo",
    },
    {
      title: "Agentes de SEO",
      subtitle: "Otimização inteligente para busca",
      description:
        "Melhore seu ranking nos mecanismos de busca com agentes de IA que otimizam seu conteúdo automaticamente.",
      image: "https://placehold.co/748x760",
      buttonText: "Saiba mais",
      buttonLink: "/servicos/agentes-seo",
    },
    {
      title: "AI Creative Suite",
      subtitle: "Criação de conteúdo potencializada",
      description:
        "Suite completa de ferramentas criativas potencializadas por IA para sua equipe.",
      image: "https://placehold.co/748x760",
      buttonText: "Saiba mais",
      buttonLink: "/servicos/ai-creative-suite",
    },
    {
      title: "AI Video Content Intelligence",
      subtitle: "Inteligência em conteúdo de vídeo",
      description:
        "Análise e otimização inteligente de conteúdo em vídeo para maior engajamento.",
      image: "https://placehold.co/748x760",
      buttonText: "Saiba mais",
      buttonLink: "/servicos/ai-video",
    },
    {
      title: "AI Data Scientist",
      subtitle: "Análise de dados inteligente",
      description:
        "Transforme seus dados em insights acionáveis com nosso cientista de dados virtual.",
      image: "https://placehold.co/748x760",
      buttonText: "Saiba mais",
      buttonLink: "/servicos/ai-data-scientist",
    },
    {
      title: "AI Whatsapp Assistant",
      subtitle: "Atendimento inteligente",
      description:
        "Automatize seu atendimento no WhatsApp com um assistente virtual inteligente.",
      image: "https://placehold.co/748x760",
      buttonText: "Saiba mais",
      buttonLink: "/servicos/ai-whatsapp",
    },
  ],
  autoRotateInterval = 5000,
}: ServicesSectionProps) {
  const activeIndex = useSignal<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const startAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset and start progress bar animation
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = "none";
      progressBarRef.current.style.width = "0%";
      // Force reflow
      progressBarRef.current.offsetHeight;
      progressBarRef.current.style.transition =
        `width ${autoRotateInterval}ms linear`;
      progressBarRef.current.style.width = "100%";
    }

    intervalRef.current = globalThis.setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % (services?.length || 1);

      // Reset and restart progress bar animation
      if (progressBarRef.current) {
        progressBarRef.current.style.transition = "none";
        progressBarRef.current.style.width = "0%";
        // Force reflow
        progressBarRef.current.offsetHeight;
        progressBarRef.current.style.transition =
          `width ${autoRotateInterval}ms linear`;
        progressBarRef.current.style.width = "100%";
      }
    }, autoRotateInterval);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Reset progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = "none";
      progressBarRef.current.style.width = "0%";
    }
  };

  const handleServiceClick = (index: number) => {
    stopAutoRotate();
    activeIndex.value = index;
    startAutoRotate();
  };

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement || !services || services.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoRotate();
          } else {
            stopAutoRotate();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(containerElement);

    return () => {
      observer.disconnect();
      stopAutoRotate();
    };
  }, [services]);

  return (
    <div className="w-full py-20 bg-ca-900">
      <ContentContainer className="flex flex-col justify-start items-center gap-24">
        {/* Header */}
        <div className="w-full max-w-[883px] flex flex-col justify-start items-center gap-6">
          <Badge
            variant="outline"
            color="secondary"
            withDot
            dotColor="primary"
          >
            {badgeText}
          </Badge>
          <h2 className="text-center text-ca-50 text-6xl font-normal font-serif leading-[56px]">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div
          ref={containerRef}
          className="self-stretch h-[760px] flex justify-start items-start gap-16"
        >
          {/* Left Column - Service List */}
          <div className="flex-1 self-stretch max-w-[500px] flex flex-col justify-start">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="border-b border-ca-600 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => handleServiceClick(index)}
                  className={`w-full py-4 text-left transition-colors ${
                    activeIndex.value === index
                      ? "text-ca-50"
                      : "text-ca-300 hover:text-ca-200"
                  }`}
                >
                  <h4 className="text-2xl font-normal leading-normal">
                    {service.title}
                  </h4>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    activeIndex.value === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="py-4 flex flex-col justify-start items-start gap-10">
                      <div className="self-stretch flex flex-col justify-start items-start gap-6">
                        <div className="self-stretch flex flex-col justify-start items-start gap-2">
                          <p className="self-stretch text-ca-400 text-3xl font-serif leading-loose">
                            {service.subtitle}
                          </p>
                        </div>
                        <p className="self-stretch text-ca-300 text-base leading-normal">
                          {service.description}
                        </p>
                      </div>

                      {service.buttonLink && (
                        <Button
                          href={service.buttonLink}
                          variant="primary"
                          size="md"
                        >
                          {service.buttonText || "Saiba mais"}
                        </Button>
                      )}

                      <div className="h-[1px] w-full bg-ca-600">
                        <div
                          ref={activeIndex.value === index
                            ? progressBarRef
                            : null}
                          className="h-[1px] bg-ca-primary w-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 h-[760px]">
            {services.map((service, index) => (
              <div
                key={index}
                className={`w-full h-full transition-opacity duration-300 absolute ${
                  activeIndex.value === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  display: activeIndex.value === index ? "block" : "none",
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={748}
                  height={760}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

export default ServicesSection;
