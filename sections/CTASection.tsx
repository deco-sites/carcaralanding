/** @jsxImportSource preact */
import { ContentContainer } from "../components/Layout.tsx";
import Button from "../components/ui/Button.tsx";

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
   * @title Additional CSS classes
   */
  class?: string;
}

export default function CTASection({
  title = "Pronto para\ncriar seu\ntime de AI?",
  subtitle = "Agende uma reunião de 30min com nosso time",
  buttonText = "Agendar reunião",
  buttonUrl = "/contato",
  class: className = "",
}: CTASectionProps) {
  return (
    <ContentContainer>
      <div
        className={`w-full inline-flex flex-col justify-start items-center gap-10 overflow-hidden ${className}`}
      >
        <div className="w-full px-8 lg:px-20 py-20 lg:py-40 relative bg-vermelho outline outline-1 outline-offset-[-1px] outline-ca-700 flex flex-col justify-center items-start gap-10 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-[120%] h-[120%] absolute -right-[20%] top-[50%] bg-zinc-800/10 rotate-12 transform-gpu" />
            <div className="w-[140%] h-[140%] absolute -right-[40%] top-[60%] bg-zinc-800/10 rotate-12 transform-gpu" />
            <div className="w-[160%] h-[160%] absolute -right-[60%] top-[70%] bg-zinc-800/10 rotate-12 transform-gpu" />
          </div>

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
