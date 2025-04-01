/** @jsxImportSource preact */
import { useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";
import { Body } from "../components/ui/Typography.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import {
  DecoIcon,
  SlackIcon,
  TeamsIcon,
} from "../components/ui/PlatformIcons.tsx";

export interface PlatformIntegration {
  /**
   * @title Platform Name
   */
  name: string;

  /**
   * @title Platform Description
   */
  description: string;

  /**
   * @title Platform Benefits
   * @description Key benefits of using this integration (max 3)
   */
  benefits: string[];

  /**
   * @title Platform Icon (Custom Upload)
   * @description Custom icon for the platform - this takes precedence over built-in icons
   * @format image
   */
  icon?: ImageWidget;

  /**
   * @title Built-in Icon
   * @description Use a built-in icon from the Icon component (only used if no custom icon is uploaded)
   */
  builtinIcon?: string;

  /**
   * @title Custom Icon Type
   * @description Type of custom icon to use (only used if no custom icon is uploaded)
   */
  customIcon?: "slack" | "teams" | "deco";

  /**
   * @title Interface Preview
   * @description Screenshot/mockup of the AI agent in this platform
   */
  interfacePreview: ImageWidget;

  /**
   * @title Background Color Class
   * @description Tailwind class for card accent color (e.g., "bg-azul", "bg-verde", "bg-vermelho", "bg-amarelo")
   * @default "bg-azul"
   */
  accentColor?: string;
}

interface PlatformTabsProps {
  platforms: PlatformIntegration[];
}

export default function PlatformTabs({ platforms }: PlatformTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Function to render the appropriate icon based on platform configuration
  const renderPlatformIcon = (platform: PlatformIntegration) => {
    // First check if a custom uploaded icon is provided and is not empty
    if (platform.icon && platform.icon !== "") {
      return (
        <Image
          src={platform.icon}
          alt={platform.name}
          width={24}
          height={24}
          class="object-contain"
        />
      );
    } else if (platform.builtinIcon) {
      return (
        <Icon
          id={platform.builtinIcon as any}
          size={24}
          className="text-amarelo"
        />
      );
    } else if (platform.customIcon) {
      switch (platform.customIcon) {
        case "slack":
          return <SlackIcon size={24} className="text-amarelo" />;
        case "teams":
          return <TeamsIcon size={24} className="text-amarelo" />;
        case "deco":
          return <DecoIcon size={24} className="text-amarelo" />;
      }
    }
    return null;
  };

  // Function to handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  // Get current platform data
  const currentPlatform = platforms[activeTab];

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex flex-col w-full mb-8 sm:mb-12 lg:mb-16">
        <div className="relative w-full overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:justify-center min-w-full">
            <div className="inline-flex">
              {platforms.map((platform, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`group flex items-center px-3 sm:px-6 md:px-8 py-3 sm:py-4 min-w-[100px] sm:min-w-[140px] transition-all duration-300 relative ${
                    activeTab === index ? "z-10" : "hover:bg-ca-800/30"
                  }`}
                  aria-label={`Show ${platform.name} integration`}
                  aria-selected={activeTab === index}
                  role="tab"
                >
                  <div className="mr-2 sm:mr-3 flex-shrink-0">
                    {renderPlatformIcon(platform)}
                  </div>
                  <span
                    className={`whitespace-nowrap font-medium text-sm sm:text-base ${
                      activeTab === index ? "text-ca-50" : "text-ca-200"
                    }`}
                  >
                    {platform.name}
                  </span>

                  {/* Colored active indicator */}
                  {activeTab === index && (
                    <div
                      className={`absolute bottom-0 left-0 w-full h-1 ${
                        platform.accentColor || "bg-azul"
                      }`}
                      style={{ bottom: "-1px" }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width divider line */}
        <div className="w-full h-px bg-ca-700" />
      </div>

      {/* Platform Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Platform Info - Left Column */}
        <div className="lg:col-span-5 flex flex-col mb-8 lg:mb-0">
          <div className="mb-6 lg:mb-0">
            <h3 className="text-ca-50 text-3xl sm:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4">
              {currentPlatform.name}
            </h3>

            <Body class="text-ca-300 mb-6 sm:mb-8">
              {currentPlatform.description}
            </Body>
          </div>

          {/* Benefits List */}
          <div className="mt-auto">
            <h4 className="text-ca-50 font-medium mb-3 sm:mb-4">
              Benefícios principais:
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {currentPlatform.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <div
                    className={`w-5 h-5 rounded-full ${
                      currentPlatform.accentColor || "bg-azul"
                    } flex items-center justify-center mt-0.5 mr-3 flex-shrink-0`}
                  >
                    <svg
                      className="w-3 h-3 text-ca-900"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="currentColor"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  </div>
                  <span className="text-ca-100">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform Interface Preview - Right Column */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="w-full">
            <Image
              src={currentPlatform.interfacePreview}
              alt={`${currentPlatform.name} interface`}
              width={800}
              height={500}
              class="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dots - Only visible on mobile */}
      <div className="flex justify-center mt-8 lg:hidden">
        <div className="flex space-x-2">
          {platforms.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => handleTabChange(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeTab === index
                  ? platforms[activeTab].accentColor || "bg-azul"
                  : "bg-ca-700"
              } ${activeTab === index ? "w-6" : ""}`}
              aria-label={`Go to ${platforms[index].name} tab`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
