import type { ImageWidget } from "apps/admin/widgets.ts";
import type { BlogPost } from "apps/blog/types.ts";
import Image from "apps/website/components/Image.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import { Body, H1 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import Icon from "../components/ui/Icon.tsx";
import SliderControllerJS from "../islands/SliderJS.tsx";
import Button from "site/components/ui/Button.tsx";

interface BlogCase {
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
}

export interface BlogPostListProps {
  /**
   * Badge text displayed at the top of the section
   * @default "Nossas soluções"
   */
  badgeText?: string;

  /**
   * Section title
   * @default "Transformações reais com AI"
   */
  title?: string;

  /**
   * Blog posts array to display
   * Will show up to 6 posts
   */
  posts?: BlogPost[] | null;

  blogCase?: BlogCase;
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const logoBrand = post.extraProps?.find((prop) => prop.key === "logoBrand")
    ?.value;

  return (
    <div className="w-full flex-shrink-0 flex flex-col h-full">
      <div className="relative">
        <Image
          src={post.image || ""}
          alt={post.title || ""}
          width={384}
          height={320}
          class="w-full h-auto object-cover aspect-[4/3.2]"
        />

        {logoBrand && (
          <div className="absolute bottom-0 w-fit h-fit left-0 p-5 bg-ca-900">
            <Image
              src={logoBrand}
              alt={`${post.title} logo`}
              width={96}
              height={24}
              class="w-auto h-auto max-w-[3rem] max-h-[1rem] md:max-w-[5rem] md:max-h-[1.5rem] object-contain"
            />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-grow min-h-[180px]">
        <H1 className="text-left text-ca-50 text-xl sm:text-2xl font-normal font-serif">
          {post.title}
        </H1>
        <Body class="text-ca-300 text-sm sm:text-base">
          {post.excerpt}
        </Body>
      </div>
    </div>
  );
}

function FeaturedBlogPost({
  posts,
  fallbackTitle = "",
  fallbackExcerpt = "",
  fallbackImage = "https://placehold.co/742x556",
  buttonText = "Ler mais",
}: BlogCase) {
  // Get the first post from the array if available
  const post = posts?.[0];

  if (!post) {
    return (
      <div className="w-full bg-ca-900 overflow-hidden">
        <ContentContainer>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Content Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 px-4 sm:px-6">
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <H1 className="text-left text-ca-50 text-2xl sm:text-3xl lg:text-4xl font-normal font-serif">
                  {fallbackTitle}
                </H1>

                <Body class="text-ca-300 text-sm sm:text-base">
                  {fallbackExcerpt}
                </Body>
              </div>

              <Button href="/blog" variant="primary" size="md">
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
                class="w-full h-auto object-cover aspect-[4/3]"
                preload
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
    <div className="w-full bg-ca-900 overflow-hidden">
      <ContentContainer>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Content Column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 px-4 sm:px-6">
            <div className="w-full flex flex-col justify-start items-start gap-3">
              <H1 className="text-left text-ca-50 text-2xl sm:text-3xl lg:text-4xl font-normal font-serif">
                {title}
              </H1>

              <Body class="text-ca-300 text-sm sm:text-base">{excerpt}</Body>
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
              class="w-full h-auto object-cover aspect-[4/3]"
              preload
            />
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

export default function BlogPostList({
  badgeText = "Nossas soluções",
  title = "Transformações reais com AI",
  posts,
  blogCase,
}: BlogPostListProps) {
  const displayPosts =
    posts?.filter((post) => post && post.image)?.slice(1, 7) || [];

  return (
    <section className="w-full py-20" id="cases">
      <ContentContainer>
        <div className="flex px-4 sm:px-16 flex-col gap-8 sm:gap-16">
          {/* Header */}
          <div className="flex justify-between items-end flex-wrap gap-8">
            <div className="flex flex-col gap-6 max-w-[883px]">
              <Badge
                variant="outline"
                color="secondary"
                withDot
                dotColor="primary"
              >
                {badgeText}
              </Badge>
              <h2 className="text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif leading-[56px]">
                {title}
              </h2>
            </div>
          </div>
          <div className="w-full h-px bg-ca-700" />

          <FeaturedBlogPost {...blogCase} />

          {/* Navigation Buttons - Commented out as requested */}
          {
            /*
                    <div className='flex justify-start items-center ml-auto gap-2'>
                        <button
                            type='button'
                            className='p-2 border border-ca-700 rounded-full hover:border-ca-500 transition-colors'
                            data-slide='prev'
                            aria-label='Previous posts'
                        >
                            <Icon id='ChevronLeft' size={16} strokeWidth={2} className='text-ca-50' />
                        </button>
                        <button
                            type='button'
                            className='p-2 border border-ca-700 rounded-full hover:border-ca-500 transition-colors'
                            data-slide='next'
                            aria-label='Next posts'
                        >
                            <Icon id='ChevronRight' size={16} strokeWidth={2} className='text-ca-50' />
                        </button>
                    </div>
                    */
          }

          {/* Posts Container */}
          <div className="relative w-full">
            {/* Scrollable Container */}
            <div
              data-slider
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayPosts.length > 0
                ? (
                  displayPosts.map((post, index) => (
                    <div
                      key={post.slug || index}
                      data-slider-item={index}
                      className="w-full"
                    >
                      <BlogPostCard post={post} />
                    </div>
                  ))
                )
                : (
                  <div className="col-span-full text-center text-ca-300 py-8">
                    No posts available
                  </div>
                )}
            </div>
          </div>
        </div>
      </ContentContainer>
      <SliderControllerJS rootId="cases" infinite scroll="smooth" />
    </section>
  );
}
