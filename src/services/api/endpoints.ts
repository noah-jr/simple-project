export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
  },
  HELP: {
    CATEGORIES: '/help/categories',
    ARTICLES: '/help/articles',
    ARTICLE: (id: string) => `/help/articles/${id}`,
    SEARCH: '/help/search',
    FEEDBACK: '/help/feedback',
  },
  BLOG: {
    POSTS: '/blog/posts',
    POST: (slug: string) => `/blog/posts/${slug}`,
    CATEGORIES: '/blog/categories',
    TAGS: '/blog/tags',
  },
};
