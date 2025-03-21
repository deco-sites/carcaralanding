import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Body, Eyebrow, HeroTitle } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";

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

export interface HeroProps {
  /**
   * @format rich-text
   * @default Aceleramos a <br/>adoção de AI<br/>na sua empresa
   */
  title?: string;

  /**
   * @default Nossos projetos fazem a ponte entre o desafio de negócio e um AI Agent que dá resultado.
   */
  description?: string;

  /**
   * @default Mais de 3k AI Apps e Agents criados
   */
  badge?: string;

  /**
   * Main hero image displayed below content
   */
  image?: ImageWidget;

  /**
   * @default Fale com um especialista
   */
  ctaText?: string;

  /**
   * @default /contato
   */
  ctaHref?: string;

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
}

export default function HeroSection({
  title = "Aceleramos a <br/>adoção de AI<br/>na sua empresa",
  description =
    "Nossos projetos fazem a ponte entre o desafio de negócio e um AI Agent que dá resultado.",
  badge = "Mais de 3k AI Apps e Agents criados",
  image = "https://placehold.co/1440x474",
  ctaText = "Fale com um especialista",
  ctaHref = "/contato",
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
}: HeroProps) {
  // Process title to apply correct styling to specific parts
  const processedTitle = title
    .replace("adoção de", "<span class='text-vermelho'>adoção de</span>")
    .replace("AI", "<span class='text-vermelho'>AI</span>");

  return (
    <section className="relative w-full bg-ca-900 overflow-hidden">
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

      {/* Content container - with higher z-index to appear above background elements */}
      <ContentContainer className="py-8 sm:py-12 md:py-16 lg:py-24 pt-32 lg:pt-40 relative z-10">
        <div className="flex flex-col justify-center items-center gap-6 sm:gap-8">
          <div className="flex flex-col justify-start items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8">
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
            <div className="text-center w-full">
              <h1
                className="hero-title font-serif text-6xl lg:text-8xl text-ca-50 leading-tight md:leading-[1.1] tracking-[-0.01em]"
                dangerouslySetInnerHTML={{ __html: processedTitle }}
              />
            </div>

            {/* Description */}
            <Body class="max-w-[280px] sm:max-w-xs md:max-w-md text-center text-ca-300">
              {description}
            </Body>

            {/* CTA Button */}
            <div className="mt-2 sm:mt-3 md:mt-4">
              <Button
                href={ctaHref}
                variant="primary"
                size="md"
              >
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </ContentContainer>

      {/* Hero image - with higher z-index to appear above background elements */}
      <ContentContainer className="p-0 relative z-10">
        <Image
          src={image}
          alt="Carcará AI"
          width={1440}
          height={474}
          class="w-full h-auto"
          preload
        />
      </ContentContainer>
    </section>
  );
}
