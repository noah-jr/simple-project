import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../services/api/apiClient';
import { ENDPOINTS } from '../../../services/api/endpoints';

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  cover_image_url: string;
  author: { name: string; avatar: string };
  category: BlogCategory;
  read_time: number;
  published_at: string;
  is_featured: boolean;
  views: number;
  meta_title?: string;
  meta_description?: string;
  gallery?: { url: string; alt?: string; type?: string }[] | string[];
}

export const useBlogCategories = () => {
  return useQuery<BlogCategory[]>({
    queryKey: ['blog-categories'],
    queryFn: () => apiClient.get(ENDPOINTS.BLOG.CATEGORIES),
  });
};

export const useBlogPosts = (category?: string, search?: string) => {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts', category, search],
    queryFn: () => apiClient.get(ENDPOINTS.BLOG.POSTS, { params: { category, search } }),
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery<BlogPost>({
    queryKey: ['blog-post', slug],
    queryFn: () => apiClient.get(ENDPOINTS.BLOG.POST(slug)),
    enabled: !!slug,
  });
};
