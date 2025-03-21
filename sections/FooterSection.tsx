import { ComponentChildren } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface FooterLinkProps {
  children: ComponentChildren;
  href: string;
}

const FooterLink = ({ children, href }: FooterLinkProps) => (
  <a
    href={href}
    class="self-stretch py-2 inline-flex justify-start items-start"
  >
    <div class="flex-1 justify-start text-ca-900 text-base font-medium font-sans leading-normal">
      {children}
    </div>
  </a>
);

interface Link {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: Link[];
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div class="inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
    <div class="self-stretch justify-start text-ca-900 text-base font-normal font-serif leading-normal tracking-tight">
      {title}
    </div>
    <div class="self-stretch flex flex-col justify-start items-start">
      {links.map((link) => (
        <FooterLink key={link.label} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </div>
  </div>
);

interface SocialIcon {
  type: "twitter" | "linkedin" | "instagram" | "facebook";
  href: string;
  ariaLabel: string;
}

export interface FooterProps {
  /**
   * Use cases column configuration
   */
  useCasesColumn?: {
    title: string;
    links: Link[];
  };

  /**
   * Transformation stories column configuration
   */
  transformationStoriesColumn?: {
    title: string;
    links: Link[];
  };

  /**
   * Industries column configuration
   */
  industriesColumn?: {
    title: string;
    links: Link[];
  };

  /**
   * Legal links at the bottom
   */
  legalLinks?: Link[];

  /**
   * Social media icons
   */
  socialIcons?: SocialIcon[];

  /**
   * Right decoration image
   */
  rightDecoration?: ImageWidget;
}

const SocialIcon = ({ type, href, ariaLabel }: SocialIcon) => {
  const iconClass = {
    twitter: "i-carbon-logo-twitter",
    linkedin: "i-carbon-logo-linkedin",
    instagram: "i-carbon-logo-instagram",
    facebook: "i-carbon-logo-facebook",
  }[type];

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      class="w-6 h-6 flex items-center justify-center text-ca-900 hover:text-vermelho transition-colors"
    >
      <span class={`${iconClass} w-5 h-5`} />
    </a>
  );
};

export default function Footer({
  useCasesColumn = {
    title: "Principais Casos de Uso",
    links: [
      { label: "CMS Generativo", href: "/use-cases/cms" },
      { label: "Agentes de SEO", href: "/use-cases/seo" },
      { label: "AI Creative Suite", href: "/use-cases/creative" },
      { label: "AI Video Content Intelligence", href: "/use-cases/video" },
      { label: "AI Data Scientist", href: "/use-cases/data" },
      { label: "AI Whatsapp Assistant", href: "/use-cases/whatsapp" },
    ],
  },
  transformationStoriesColumn = {
    title: "Histórias de Transformação",
    links: [
      { label: "Livemode cria seu próprio Photoshop", href: "/cases/livemode" },
      {
        label: "Leroy Merlin substitui 3 ferramentas por 1",
        href: "/cases/leroy",
      },
      {
        label: "Época Cosméticos gera relatórios 10x mais rápido",
        href: "/cases/epoca",
      },
      {
        label: "Casa & Video aumenta tráfego orgânico em 20x",
        href: "/cases/casa-video",
      },
      {
        label: "Miess reduz tempo de criação de campanhas",
        href: "/cases/miess",
      },
    ],
  },
  industriesColumn = {
    title: "Indústrias",
    links: [
      { label: "Varejo", href: "/industries/retail" },
      { label: "Mídia", href: "/industries/media" },
      { label: "Instituições Financeiras", href: "/industries/finance" },
    ],
  },
  legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookies Settings", href: "/cookies" },
  ],
  socialIcons = [
    {
      type: "twitter",
      href: "https://twitter.com/carcara",
      ariaLabel: "Twitter",
    },
    {
      type: "linkedin",
      href: "https://linkedin.com/company/carcara",
      ariaLabel: "LinkedIn",
    },
    {
      type: "instagram",
      href: "https://instagram.com/carcara",
      ariaLabel: "Instagram",
    },
    {
      type: "facebook",
      href: "https://facebook.com/carcara",
      ariaLabel: "Facebook",
    },
  ],
  rightDecoration = "https://placehold.co/409x641",
}: FooterProps) {
  return (
    <div class="w-full bg-amarelo flex">
      <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-12 lg:pt-20 pb-16 lg:pb-32 relative inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div class="absolute -right-16 top-0 w-[409px] h-[641px] hidden lg:block">
          <Image
            src={rightDecoration}
            alt="Footer decoration"
            width={409}
            height={641}
            class="w-full h-full object-cover"
          />
        </div>

        <div class="w-full max-w-4xl flex flex-col lg:flex-row lg:justify-between items-start gap-8 lg:gap-0 relative z-10">
          <div class="w-full lg:w-56">
            <FooterColumn
              title={useCasesColumn.title}
              links={useCasesColumn.links}
            />
          </div>
          <div class="w-full lg:w-72">
            <FooterColumn
              title={transformationStoriesColumn.title}
              links={transformationStoriesColumn.links}
            />
          </div>
          <div class="w-full lg:w-44">
            <FooterColumn
              title={industriesColumn.title}
              links={industriesColumn.links}
            />
          </div>
        </div>

        <div class="w-full max-w-3xl flex flex-col justify-start items-start gap-8 relative z-10">
          <div class="self-stretch flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 sm:gap-0">
            <div class="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-center gap-4 sm:gap-6">
              <div class="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-4 sm:gap-6">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    class="text-ca-900 text-sm font-normal font-sans leading-tight hover:text-vermelho transition-colors text-center sm:text-left"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div class="flex justify-center sm:justify-start items-start gap-3">
              {socialIcons.map((social) => (
                <SocialIcon key={social.type} {...social} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
