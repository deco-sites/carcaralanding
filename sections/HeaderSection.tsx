import Button from "../components/ui/Button.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "outline";
  ariaLabel?: string;
}

export interface LogoImage {
  src: ImageWidget;
  alt: string;
  width: number;
  height: number;
}

export interface Props {
  className?: string;
  logo?: {
    desktop?: LogoImage;
    mobile?: LogoImage;
  };
  navigation?: {
    items: NavItem[];
  };
  cta?: {
    buttons: CTAButton[];
  };
}

const defaultLogo = {
  desktop: {
    src: "",
    alt: "Carcará Logo Desktop",
    width: 180,
    height: 40,
  },
  mobile: {
    src: "",
    alt: "Carcará Logo Mobile",
    width: 120,
    height: 30,
  },
};

const defaultNavigation = {
  items: [
    { label: "Menu Item 1", href: "#", ariaLabel: "Navigation item 1" },
    { label: "Menu Item 2", href: "#", ariaLabel: "Navigation item 2" },
    { label: "Menu Item 3", href: "#", ariaLabel: "Navigation item 3" },
  ],
};

const defaultCTA = {
  buttons: [
    {
      label: "Primary CTA",
      href: "#",
      variant: "primary" as const,
      ariaLabel: "Primary call to action",
    },
  ],
};

export default function HeaderSection({
  className = "",
  logo = defaultLogo,
  navigation = defaultNavigation,
  cta = defaultCTA,
}: Props) {
  const desktopLogo = logo?.desktop ?? defaultLogo.desktop;
  const mobileLogo = logo?.mobile ?? defaultLogo.mobile;

  return (
    <header className="z-50 ">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-6 flex justify-between items-center">
        <div className="flex-1 flex justify-between items-center">
          {/* Left side with logo and navigation */}
          <div className="flex justify-start items-center gap-4 md:gap-10">
            {/* Logo */}
            <a href="/" className="block" aria-label={desktopLogo.alt}>
              <Image
                src={desktopLogo.src}
                alt={desktopLogo.alt}
                width={desktopLogo.width}
                height={desktopLogo.height}
                className="hidden md:block"
                loading="eager"
              />
              <Image
                src={mobileLogo.src}
                alt={mobileLogo.alt}
                width={mobileLogo.width}
                height={mobileLogo.height}
                className="block max-h-12 md:hidden"
                loading="eager"
              />
            </a>

            {/* Navigation buttons */}
            <nav className="hidden md:flex justify-start items-center gap-2">
              {navigation.items.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  href={item.href}
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Right side CTA buttons */}
          <div className="flex justify-start items-center gap-2">
            {cta.buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                href={button.href}
                class={`rounded-full ${
                  button.variant === "primary" ? "bg-amarelo" : ""
                }`}
                aria-label={button.ariaLabel}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
