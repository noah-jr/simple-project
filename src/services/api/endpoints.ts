export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
  },
  HELP: {
    CATEGORIES: '/public/help/categories',
    ARTICLES: '/public/help/articles',
    ARTICLE: (slug: string) => `/public/help/articles/${slug}`,
    ARTICLE_FEEDBACK: (slug: string) => `/public/help/articles/${slug}/feedback`,
    SEARCH: '/public/help/search',
  },
  BLOG: {
    POSTS: '/public/blog/posts',
    POST: (slug: string) => `/public/blog/posts/${slug}`,
    CATEGORIES: '/public/blog/categories',
    TAGS: '/public/blog/tags',
  },
};
