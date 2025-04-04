import { ContentContainer } from "../components/Layout.tsx";
import Badge from "../components/ui/Badge.tsx";
import { Body, H1 } from "../components/ui/Typography.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * Interface for individual success story item
 */
export interface SuccessStoryPrincipal {
  /**
   * @title Success Story Title
   * @description The main headline of the success story
   */
  title?: string;

  /**
   * @title Success Story Description
   * @description Short description of the results achieved
   */
  description?: string;

  /**
   * @title Client Image
   * @description Image representing the client or their products
   */
  image?: ImageWidget;

  /**
   * @title Client Logo
   * @description Logo of the client company
   */
  logo?: ImageWidget;

  /**
   * @title Show Button
   * @description Whether to show the button (optional)
   */
  showButton?: boolean;

  /**
   * @title Button Text
   * @description Text for the button (optional)
   */
  buttonText?: string;

  /**
   * @title Button URL
   * @description URL to navigate to when clicking the button
   */
  buttonUrl?: string;
}

export interface SuccessStory {
  /**
   * @title Success Story Title
   * @description The main headline of the success story
   */
  title?: string;

  /**
   * @title Client Image
   * @description Image representing the client or their products
   */
  image?: ImageWidget;

  /**
   * @title Client Logo
   * @description Logo of the client company
   */
  logo?: ImageWidget;

  /**
   * @title Show Button
   * @description Whether to show the button (optional)
   */
  showButton?: boolean;

  /**
   * @title Button Text
   * @description Text for the button (optional)
   */
  buttonText?: string;

  /**
   * @title Button URL
   * @description URL to navigate to when clicking the button
   */
  buttonUrl?: string;
}
export interface SuccessStoriesSectionProps {
  /**
   * @title Badge Text
   */
  badgeText?: string;

  /**
   * @title Section Title
   */
  title?: string;

  /**
   * @title Featured Success Story
   * @description The main success story to highlight
   */
  featuredStory?: SuccessStoryPrincipal;

  /**
   * @title Additional Success Stories
   * @description List of additional success stories to display
   */
  additionalStories?: SuccessStory[];
}

/**
 * Success Story Card Component
 */
function SuccessStoryCard({
  title,
  image,
  logo,
  buttonText,
  buttonUrl,
  showButton,
}: SuccessStory) {
  return (
    <div
      class={`flex flex-col h-full overflow-hidden bg-ca-900 rounded-lg border border-ca-800`}
    >
      <div class="flex flex-col p-8 pb-12 h-[180px]">
        <H1
          class={`text-ca-50 text-2xl lg:text-3xl font-serif`}
        >
          {title}
        </H1>
        {showButton && (
          <div class="pt-4">
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block px-6 py-3 bg-ca-800 hover:bg-ca-700 text-ca-50 font-medium rounded-md transition-colors duration-300 text-center"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>

      {image && (
        <div class="w-full h-[280px] relative">
          <Image
            src={image}
            alt={title}
            width={800}
            height={500}
            class="w-full h-full object-cover"
          />

          {logo && (
            <div class="absolute left-0 bottom-0 p-2 bg-black/80 h-10 w-10 flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                width={60}
                height={60}
                class="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Card destacado com layout horizontal
 */
function FeaturedStoryCard({
  title,
  description,
  image,
  buttonText,
  buttonUrl,
  showButton,
}: SuccessStoryPrincipal) {
  return (
    <div
      className={`flex flex-col md:flex-row overflow-hidden bg-ca-900 rounded-lg border border-ca-800`}
    >
      {/* Conteúdo em cima (em mobile) ou à esquerda (em desktop) */}
      <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
        <H1 class="text-ca-50 text-3xl lg:text-5xl mb-4 font-serif">
          {title}
        </H1>

        <Body class="text-ca-300 mb-6">
          {description}
        </Body>

        {showButton && (
          <div>
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block px-6 py-3 bg-ca-800 hover:bg-ca-700 text-ca-50 font-medium rounded-md transition-colors duration-300"
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>

      {/* Imagem embaixo (em mobile) ou à direita (em desktop) */}
      {image && (
        <div className="md:w-1/2 h-auto">
          <Image
            src={image}
            alt={title}
            width={800}
            height={500}
            class="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

/**
 * Success Stories Section
 */
export default function SuccessStoriesSection({
  badgeText,
  title,
  featuredStory,
  additionalStories,
}: SuccessStoriesSectionProps) {
  return (
    <section
      id="cases"
      className={`w-full bg-ca-900 py-16 md:py-24 px-4 sm:px-16 flex gap 8 flex-col`}
    >
      <ContentContainer>
        <div className="flex flex-col items-start text-left mb-12">
          <Badge
            variant="outline"
            color="secondary"
            withDot={true}
            dotColor="primary"
          >
            {badgeText}
          </Badge>

          <h1 className="text-left font-serif text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal mt-4 max-w-4xl">
            {title}
          </h1>
        </div>

        {/* Card destacado */}
        <div className="mb-14">
          <FeaturedStoryCard {...featuredStory} />
        </div>

        {/* Grade de cards adicionais - com altura fixa */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {additionalStories?.map((story, index) => (
            <div className="col-span-1" key={index}>
              <SuccessStoryCard {...story} />
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
