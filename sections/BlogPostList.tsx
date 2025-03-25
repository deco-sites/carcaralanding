import type { ImageWidget } from "apps/admin/widgets.ts";
import { BlogPost } from "apps/blog/types.ts";
import { Body, Eyebrow, H2 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Button from "../components/ui/Button.tsx";
import { useId } from "preact/hooks";
import SliderControllerJS from "../islands/SliderJS.tsx";

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

  /**
   * Additional CSS classes for the container
   */
  class?: string;
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const logoBrand = post.extraProps?.find((prop) => prop.key === "logoBrand")
    ?.value;

  return (
    <div className="relative w-[300px] h-[400px] sm:w-[384px] sm:h-[600px] group flex-shrink-0">
      <Image
        src={post.image || ""}
        alt={post.title || ""}
        width={384}
        height={683}
        class="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-ca-900" />

      {logoBrand && (
        <div className="absolute top-0 left-0 h-12 p-5 bg-ca-900">
          <Image
            src={logoBrand}
            alt={`${post.title} logo`}
            width={96}
            height={24}
            class="h-full w-auto object-contain"
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
        <h3 className="text-ca-50 text-xl font-medium font-['Inter'] leading-7">
          {post.title}
        </h3>
        <p className="text-ca-300 text-base font-normal font-['Inter'] leading-normal">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
}

export default function BlogPostList({
  badgeText = "Nossas soluções",
  title = "Transformações reais com AI",
  posts,
  class: className = "",
}: BlogPostListProps) {
  const displayPosts =
    posts?.filter((post) => post && post.image)?.slice(0, 6) || [];

  return (
    <section className={`w-full py-20 ${className}`} id="cases">
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

            {/* Navigation Buttons */}
            <div className="flex justify-start items-center gap-2">
              <button
                type="button"
                className="p-2 border border-ca-700 rounded-full hover:border-ca-500 transition-colors"
                data-slide="prev"
                aria-label="Previous posts"
              >
                <Icon
                  id="ChevronLeft"
                  size={16}
                  strokeWidth={2}
                  className="text-ca-50"
                />
              </button>
              <button
                type="button"
                className="p-2 border border-ca-700 rounded-full hover:border-ca-500 transition-colors"
                data-slide="next"
                aria-label="Next posts"
              >
                <Icon
                  id="ChevronRight"
                  size={16}
                  strokeWidth={2}
                  className="text-ca-50"
                />
              </button>
            </div>
          </div>
          <div className="w-full h-px bg-ca-700" />

          {/* Posts Container */}
          <div className="relative">
            {/* Scrollable Container */}
            <div
              data-slider
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {displayPosts.length > 0
                ? displayPosts.map((post, index) => (
                  <div
                    key={post.slug || index}
                    data-slider-item={index}
                    className="shrink-0 snap-center"
                  >
                    <BlogPostCard post={post} />
                  </div>
                ))
                : (
                  <div className="w-full text-center text-ca-300 py-8">
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
