import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { BlogPost } from "apps/blog/types.ts";
import { Body, Eyebrow, H1 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import Button from "../components/ui/Button.tsx";
import { ContentContainer } from "../components/Layout.tsx";

export interface FeaturedBlogPostProps {
  /**
   * Badge text displayed at the top of the section
   * @default "Destaque"
   */
  badgeText?: string;

  /**
   * Blog posts array from which to select the featured post
   * The first post in the array will be featured
   */
  posts?: BlogPost[] | null;

  /**
   * Fallback title if no post is provided or found
   * @default "Livemode constrói seu próprio Photoshop"
   */
  fallbackTitle?: string;

  /**
   * Fallback excerpt if no post is provided or found
   * @default "Saiba como a Livemode, parceira da Cazé TV, está criando material gráficos para suas transmissões 100x mais rápido com 40 AI Agents diferentes."
   */
  fallbackExcerpt?: string;

  /**
   * Fallback image if no post is provided or found
   */
  fallbackImage?: ImageWidget;

  /**
   * Button text
   * @default "Ler mais"
   */
  buttonText?: string;

  /**
   * Additional CSS classes for the container
   */
  class?: string;
}

/**
 * Featured Blog Post section that displays a highlighted blog post
 *
 * To configure this component in the CMS:
 * 1. Select this component in the CMS
 * 2. Configure the "posts" prop with:
 *    {
 *      "__resolveType": "blog/loaders/BlogpostList.ts",
 *      "sortBy": "date_desc",
 *      "count": 1
 *    }
 * 3. The component will automatically display the latest blog post
 */
export default function FeaturedBlogPost({
  badgeText = "Destaque",
  posts,
  fallbackTitle = "",
  fallbackExcerpt = "",
  fallbackImage = "https://placehold.co/742x556",
  buttonText = "Ler mais",
  class: className = "",
}: FeaturedBlogPostProps) {
  // Get the first post from the array if available
  const post = posts?.[0];

  if (!post) {
    return (
      <div
        className={`w-full bg-ca-900 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden ${className}`}
      >
        <ContentContainer>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
            {/* Content Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-8 lg:px-14">
              <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-6">
                <Badge
                  variant="outline"
                  color="secondary"
                  withDot
                  dotColor="primary"
                >
                  {badgeText}
                </Badge>

                <H1 className="text-left text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
                  {fallbackTitle}
                </H1>

                <Body class="text-ca-300 text-sm sm:text-base">
                  {fallbackExcerpt}
                </Body>
              </div>

              <Button
                href="/blog"
                variant="primary"
                size="md"
              >
                {buttonText}
              </Button>
            </div>

            {/* Image Column */}
            <div className="w-full lg:w-1/2">
              <Image
                src={fallbackImage}
                alt={fallbackTitle}
                width={742}
                height={556}
                class="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                preload={true}
              />
            </div>
          </div>
        </ContentContainer>
      </div>
    );
  }

  // Extract content from the blog post
  const title = post.title || fallbackTitle;
  const excerpt = post.excerpt || fallbackExcerpt;
  const image = post.image || fallbackImage;
  const postUrl = `/blog/${
    post.slug || post.title?.toLowerCase().replace(/\s+/g, "-")
  }`;

  return (
    <div
      className={`w-full bg-ca-900 py-8 sm:py-10 md:py-16 lg:py-20 overflow-hidden ${className}`}
    >
      <ContentContainer>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
          {/* Content Column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 sm:gap-6 md:gap-10 px-4 sm:px-6 md:px-8 lg:px-14">
            <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-6">
              <Badge
                variant="outline"
                color="secondary"
                withDot
                dotColor="primary"
              >
                {badgeText}
              </Badge>

              <H1 className="text-left text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
                {title}
              </H1>

              <Body class="text-ca-300 text-sm sm:text-base">
                {excerpt}
              </Body>
            </div>

            <Button
              href={postUrl}
              variant="primary"
              size="md"
              class="w-full sm:w-auto"
            >
              {buttonText}
            </Button>
          </div>

          {/* Image Column */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <Image
              src={image}
              alt={title}
              width={742}
              height={556}
              class="w-full h-auto rounded-lg object-cover aspect-[4/3]"
              preload={true}
            />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

// Remove the loader function as it's not needed
// The blog posts should be configured through the CMS
