import type { BlogPostListProps } from "../BlogPostList.tsx";
import type { BlogPost } from "apps/blog/types.ts";

interface Props extends BlogPostListProps {
  /**
   * @description Number of posts to load
   * @default 10
   */
  count?: number;

  /**
   * @description Sort order for posts
   * @default "date_desc"
   */
  sortBy?: "date_desc" | "date_asc";
}

/**
 * @title Blog Post List Loader
 */
export default async function BlogPostListLoader(
  props: Props,
): Promise<BlogPostListProps> {
  // Import the blog loader
  const { default: blogLoader } = await import(
    "apps/blog/loaders/BlogpostList.ts"
  );

  const posts = await blogLoader({
    limit: props.count ?? 10,
    sort: { date: props.sortBy === "date_asc" ? "asc" : "desc" },
  });

  return {
    ...props,
    posts: Array.isArray(posts) ? posts : [],
  };
}
