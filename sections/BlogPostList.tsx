import type { ImageWidget } from "apps/admin/widgets.ts";
import { BlogPost } from "apps/blog/types.ts";
import { Body, Eyebrow, H2 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Button from "../components/ui/Button.tsx";

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
  // Extract logoBrand from extraProps
  const logoBrand = post.extraProps?.find((prop) => prop.key === "logoBrand")
    ?.value;

  // Debug log for individual post
  console.log("Rendering post:", {
    title: post.title,
    image: post.image,
    excerpt: post.excerpt,
    logoBrand,
    extraProps: post.extraProps,
  });

  return (
    <div className="relative w-full md:w-[384px] h-[683px] group">
      {/* Background Image with Gradient Overlay */}
      <Image
        src={post.image || ""}
        alt={post.title || ""}
        width={384}
        height={683}
        class="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-ca-900" />

      {/* Logo Brand */}
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

      {/* Content */}
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
  // Debug log for posts array
  console.log("BlogPostList received posts:", posts);

  // Take only the first 6 posts
  const displayPosts = posts?.slice(0, 6) || [];

  // Debug log for display posts
  console.log("Display posts:", displayPosts);

  return (
    <div className={`w-full py-20 relative ${className}`}>
      <ContentContainer>
        <div className="flex flex-col gap-24">
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
              <h2 className="text-center text-ca-50 text-6xl font-normal font-serif leading-[56px]">
                {title}
              </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-start items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                aria-label="Previous posts"
              >
                <Icon id="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label="Next posts"
              >
                <Icon id="ChevronRight" size={16} />
              </Button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute left-[-30px] right-[-30px] top-[220px] h-[1px] bg-ca-700" />

            {/* Posts Container */}
            <div className="flex gap-1 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:-mx-8 md:px-8 lg:mx-0 lg:px-0">
              {displayPosts.length > 0
                ? (
                  displayPosts.map((post, index) => (
                    <div
                      key={post.slug || index}
                      className="snap-start flex-none first:pl-0 last:pr-0"
                    >
                      <BlogPostCard post={post} />
                    </div>
                  ))
                )
                : (
                  <div className="w-full text-center text-ca-300 py-8">
                    No posts available
                  </div>
                )}
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
