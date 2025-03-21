export interface BlogPost {
  /**
   * The unique slug for the blog post
   */
  slug?: string;

  /**
   * The title of the blog post
   */
  title?: string;

  /**
   * The excerpt or short description of the blog post
   */
  excerpt?: string;

  /**
   * The main image URL for the blog post
   */
  image?: string;

  /**
   * Extra properties for the blog post
   */
  extraProps?: Array<{
    key: string;
    value: string;
  }>;
}
