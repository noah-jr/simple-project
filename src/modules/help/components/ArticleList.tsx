import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: number | string;
  slug?: string;
  title: string;
  content?: string;
  readTime?: string;
}

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Nenhum artigo encontrado nesta categoria.
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {articles.map((article) => {
        const linkId = article.slug || article.id;
        const wordCount = article.content ? article.content.split(/\s+/).length : 0;
        const readTime = article.readTime || (Math.max(1, Math.ceil(wordCount / 200)) + ' min');
        
        return (
          <li key={article.id}>
            <Link 
              to={`/help/article/${linkId}`}
              className="group flex items-center justify-between p-3 rounded hover:bg-[#f1ecff] transition-colors duration-150"
            >
              <div>
                <h3 className="text-base font-normal text-black group-hover:text-[#5025d1] transition-colors duration-150">
                  {article.title}
                </h3>
                <p className="text-[#737373] text-sm mt-0.5">
                  {readTime} de leitura
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5025d1] flex-shrink-0 ml-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

