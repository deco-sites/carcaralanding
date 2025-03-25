import { ComponentChildren } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";

// Define a simpler interface for blog posts to avoid type conflicts
export interface SimpleBlogPost {
  slug?: string;
  title?: string;
  excerpt?: string;
  image?: string;
  extraProps?: Array<{
    key: string;
    value: string;
  }>;
}

interface FooterLinkProps {
  children: ComponentChildren;
  href: string;
}

const FooterLink = ({ children }: FooterLinkProps) => (
  <p class="self-stretch py-2 inline-flex justify-start items-start">
    <div class="flex-1 justify-start text-ca-900 text-base font-medium font-sans leading-normal">
      {children}
    </div>
  </p>
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
      {links && links.length > 0
        ? (
          links.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))
        )
        : <div class="text-ca-900 text-sm">No links available</div>}
    </div>
  </div>
);

interface SocialIcon {
  type: "twitter" | "linkedin" | "instagram" | "facebook";
  href: string;
  ariaLabel: string;
}

interface ColumnConfig {
  title: string;
  show?: boolean;
}

/**
 * Footer section component that displays navigation links, blog posts, and social media icons.
 *
 * To configure the blog posts in the CMS, use the following configuration for the transformationStoriesColumn:
 * ```json
 * {
 *   "transformationStoriesColumn": {
 *     "title": "Histórias de Transformação",
 *     "show": true,
 *     "posts": {
 *       "__resolveType": "blog/loaders/BlogpostList.ts",
 *       "sortBy": "date_desc",
 *       "count": 6
 *     }
 *   }
 * }
 * ```
 */
export interface FooterProps {
  /**
   * Use cases column configuration
   */
  useCasesColumn?: {
    title: string;
    show?: boolean;
    links: Link[];
  };

  /**
   * Transformation stories column configuration.
   * Configure with blog/loaders/BlogpostList.ts in the CMS to show latest blog posts
   */
  transformationStoriesColumn?: {
    title: string;
    show?: boolean;
    posts?: BlogPost[] | null;
  };

  /**
   * Industries column configuration
   */
  industriesColumn?: {
    title: string;
    show?: boolean;
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

  /**
   * Mobile logo configuration
   */
  mobileLogo?: {
    image: ImageWidget;
    alt: string;
    href: string;
  };
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
    show: true,
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
    show: true,
    posts: null,
  },
  industriesColumn = {
    title: "Indústrias",
    show: false, // Default to hidden since you mentioned it's not being used
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
  mobileLogo,
}: FooterProps) {
  const transformationLinks = transformationStoriesColumn.posts
    ?.filter((post): post is BlogPost => {
      const isValid = Boolean(post && post.title);
      if (!isValid) {
        console.log("Filtered out invalid post:", post);
      }
      return isValid;
    })
    .slice(0, 6)
    .map((post) => {
      const link = {
        label: post.title || "Untitled Post",
        href: `/blog/${
          post.slug || post.title?.toLowerCase().replace(/\s+/g, "-") || "post"
        }`,
      };
      console.log("Created link:", link);
      return link;
    }) || [];

  // Get visible columns
  const visibleColumns = [
    useCasesColumn.show && (
      <div key="useCases" class="w-full lg:w-56">
        <FooterColumn
          title={useCasesColumn.title}
          links={useCasesColumn.links}
        />
      </div>
    ),
    transformationStoriesColumn.show && (
      <div key="transformationStories" class="w-full lg:w-72">
        <FooterColumn
          title={transformationStoriesColumn.title ||
            "Histórias de Transformação"}
          links={transformationLinks}
        />
      </div>
    ),
    industriesColumn.show && (
      <div key="industries" class="w-full lg:w-44">
        <FooterColumn
          title={industriesColumn.title}
          links={industriesColumn.links}
        />
      </div>
    ),
  ].filter(Boolean);

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

        <div class="w-full max-w-4xl flex flex-col lg:flex-row lg:gap-16 items-start gap-8 relative z-10">
          {visibleColumns}
        </div>

        <div class="w-full max-w-3xl flex flex-col justify-start items-start gap-8 relative z-10">
          <div class="w-full flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
            <div class="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6">
              <div class="w-full flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-6">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    class="text-ca-900 text-sm font-normal font-sans leading-tight hover:text-vermelho transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div class="flex justify-start sm:justify-start items-start gap-3">
              {socialIcons.map((social) => (
                <SocialIcon key={social.type} {...social} />
              ))}
            </div>
          </div>

          {/* Mobile Logo */}
          {mobileLogo && (
            <div class="w-full flex justify-center sm:hidden mt-8">
              <a href={mobileLogo.href} class="inline-block">
                <Image
                  src={mobileLogo.image}
                  alt={mobileLogo.alt}
                  width={120}
                  height={40}
                  class="h-10 w-auto object-contain"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
