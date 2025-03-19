/** @jsxImportSource preact */
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import Icon from "../components/ui/Icon.tsx";
import { BlogPost } from "apps/blog/types.ts";

export interface BlogPostListProps {
  /**
   * @title Badge Text
   * @description Text displayed in the badge above the title
   * @default "Nossas soluções"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @description Main title of the section
   * @default "Transformações reais com AI"
   */
  title?: string;

  /**
   * @title Blog Posts
   * @description List of blog posts to display. Configure in CMS with:
   * {
   *   "__resolveType": "blog/loaders/BlogpostList.ts",
   *   "sortBy": "date_desc",
   *   "count": 10
   * }
   */
  posts?: BlogPost[] | null;

  /**
   * @title Fallback Image
   * @description Image to show when a post doesn't have one
   */
  fallbackImage?: ImageWidget;
}

function BlogPostList({
  badgeText = "Nossas soluções",
  title = "Transformações reais com AI",
  posts = [],
  fallbackImage = "https://placehold.co/384x683",
}: BlogPostListProps) {
  const startIndex = useSignal(0);
  const postsPerPage = 4;

  const handlePrevious = () => {
    if (startIndex.value > 0) {
      startIndex.value -= 1;
    }
  };

  const handleNext = () => {
    if (startIndex.value < (posts?.length ?? 0) - postsPerPage) {
      startIndex.value += 1;
    }
  };

  // If posts is null or undefined, use empty array
  const validPosts = posts || [];
  const visiblePosts = validPosts.slice(
    startIndex.value,
    startIndex.value + postsPerPage,
  );

  // If there are no posts, don't render anything
  if (validPosts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[1440px] px-16 pt-20 relative flex flex-col justify-start items-start gap-24 overflow-hidden">
      {/* Header */}
      <div className="self-stretch flex justify-between items-end">
        <div className="w-[883px] flex flex-col justify-start items-start gap-6">
          <Badge
            variant="outline"
            color="secondary"
            withDot
            dotColor="primary"
          >
            {badgeText}
          </Badge>
          <h2 className="text-ca-50 text-6xl font-normal font-serif leading-[56px]">
            {title}
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-start items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={startIndex.value === 0}
            className={`w-10 h-10 px-4 py-2 rounded-md outline outline-1 outline-offset-[-1px] outline-ca-700 flex justify-center items-center gap-2 ${
              startIndex.value === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-ca-800"
            }`}
          >
            <Icon
              id="ChevronLeft"
              size={16}
              strokeWidth="medium"
              className="text-ca-200"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex.value >= validPosts.length - postsPerPage}
            className={`w-10 h-10 px-4 py-2 rounded-md outline outline-1 outline-offset-[-1px] outline-ca-700 flex justify-center items-center gap-2 ${
              startIndex.value >= validPosts.length - postsPerPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-ca-800"
            }`}
          >
            <Icon
              id="ChevronRight"
              size={16}
              strokeWidth="medium"
              className="text-ca-200"
            />
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="w-full h-[683px] flex justify-start items-start gap-1 overflow-hidden">
        {visiblePosts.map((post) => {
          const postImage = post.image || fallbackImage;
          const postUrl = `/blog/${
            post.slug || post.title?.toLowerCase().replace(/\s+/g, "-")
          }`;

          return (
            <a
              key={post.slug || post.title}
              href={postUrl}
              className="w-96 h-full relative group cursor-pointer"
            >
              {/* Post Image */}
              <div className="absolute inset-0">
                <Image
                  src={postImage}
                  alt={post.title || "Blog post"}
                  width={384}
                  height={683}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-ca-900" />

              {/* Post Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-start items-start gap-3">
                <h3 className="text-ca-50 text-xl font-medium leading-7">
                  {post.title}
                </h3>
                <p className="text-ca-300 text-base leading-normal">
                  {post.excerpt}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Horizontal Line */}
      <div className="w-[calc(100%+60px)] h-0 -left-[30px] top-[220px] absolute outline outline-1 outline-offset-[-0.50px] outline-ca-700" />
    </div>
  );
}

/**
 * @title Blog Post List Section
 * @description A section that displays a list of blog posts with navigation arrows
 *
 * To configure this component in the CMS:
 * 1. Select this component in the CMS
 * 2. Configure the "posts" prop with:
 *    {
 *      "__resolveType": "blog/loaders/BlogpostList.ts",
 *      "sortBy": "date_desc",
 *      "count": 10
 *    }
 * 3. The component will automatically display the latest blog posts
 */
export default function BlogPostListSection(props: BlogPostListProps) {
  return (
    <div data-island>
      <BlogPostList {...props} />
    </div>
  );
}
