/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Button from "../components/ui/Button.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTASectionProps {
  /**
   * @title Section Title
   * @description Main title of the section
   * @default "Pronto para criar seu time de AI?"
   */
  title?: string;

  /**
   * @title Subtitle
   * @description Text displayed below the title
   * @default "Agende uma reunião de 30min com nosso time"
   */
  subtitle?: string;

  /**
   * @title Button Text
   * @description Text displayed on the CTA button
   * @default "Agendar reunião"
   */
  buttonText?: string;

  /**
   * @title Button URL
   * @description URL for the CTA button
   * @default "/contato"
   */
  buttonUrl?: string;

  /**
   * @title Background Image
   * @description Decorative background image
   */
  backgroundImage?: ImageWidget;

  /**
   * @title Show Background Elements
   * @description Whether to show background decorative elements
   * @default true
   */
  showBackgroundElements?: boolean;

  /**
   * @title Additional CSS classes
   */
  class?: string;
}

export default function CTASection({
  title = "Pronto para\ncriar seu\ntime de AI?",
  subtitle = "Agende uma reunião de 30min com nosso time",
  buttonText = "Agendar reunião",
  buttonUrl = "/contato",
  backgroundImage = "https://placehold.co/3505x2270/B13431/B13431",
  showBackgroundElements = true,
  class: className = "",
}: CTASectionProps) {
  return (
    <ContentContainer>
      <div
        className={`w-full inline-flex flex-col justify-start items-center gap-10 overflow-hidden ${className}`}
      >
        <div className="w-full px-8 lg:px-20 py-20 lg:py-40 relative bg-vermelho outline outline-1 outline-offset-[-1px] outline-ca-700 flex flex-col justify-center items-start gap-10 overflow-hidden">
          {/* Background decorative elements */}
          {showBackgroundElements && backgroundImage && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-[100rem] z-0">
                <Image
                  src={backgroundImage}
                  alt="Background decoration"
                  width={3505}
                  height={2270}
                  class="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col justify-start items-start gap-6 relative z-10">
            <h2 className="text-ca-50 text-4xl lg:text-8xl font-normal font-serif leading-tight lg:leading-[88px] whitespace-pre-line">
              {title}
            </h2>
          </div>

          {/* CTA Box */}
          <div className="self-stretch p-6 lg:p-10 bg-ca-900 border-b border-ca-600 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-2.5 relative z-10">
            <p className="flex-1 text-ca-300 text-xl lg:text-2xl font-normal leading-normal">
              {subtitle}
            </p>
            <Button
              href={buttonUrl}
              variant="primary"
              size="lg"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
