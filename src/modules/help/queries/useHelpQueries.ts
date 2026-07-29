import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';

export interface HelpCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  articles_count: number;
}

export interface HelpArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: HelpCategory;
  author: { name: string; avatar: string };
  views: number;
  helpful_yes: number;
  helpful_no: number;
  updated_at: string;
}

export const useHelpCategories = () => {
  return useQuery<HelpCategory[]>({
    queryKey: ['help-categories'],
    queryFn: () => apiClient.get(ENDPOINTS.HELP.CATEGORIES),
  });
};

export const useHelpArticles = (category?: string, search?: string) => {
  return useQuery<HelpArticle[]>({
    queryKey: ['help-articles', category, search],
    queryFn: () => apiClient.get(ENDPOINTS.HELP.ARTICLES, { params: { category, search } }),
  });
};

export const useHelpArticle = (slug: string) => {
  return useQuery<HelpArticle>({
    queryKey: ['help-article', slug],
    queryFn: () => apiClient.get(ENDPOINTS.HELP.ARTICLE(slug)),
    enabled: !!slug,
  });
};

export const useHelpArticleFeedback = () => {
  return useMutation({
    mutationFn: ({ slug, is_helpful }: { slug: string; is_helpful: boolean }) =>
      apiClient.post(ENDPOINTS.HELP.ARTICLE_FEEDBACK(slug), { is_helpful }),
  });
};
