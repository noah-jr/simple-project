import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ARTICLES_BY_CATEGORY } from '../constants/articles';

// Create a flat list of all articles for searching
const allArticles = Object.entries(ARTICLES_BY_CATEGORY).flatMap(([category, articles]) => 
  articles.map(article => ({ ...article, category }))
);

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Pesquisar artigos..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof allArticles>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current category based on URL to optionally filter or boost results
  const currentPath = location.pathname;
  let selectedCategory = '';
  if (currentPath.startsWith('/help/category/')) {
    selectedCategory = currentPath.split('/help/category/')[1];
  }

  // Handle search logic
  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerQuery = query.toLowerCase();
      const filtered = allArticles.filter(article => 
        article.title.toLowerCase().includes(lowerQuery)
      );

      // Sort: if we are in a specific category, bubble those up
      if (selectedCategory) {
        filtered.sort((a, b) => {
          if (a.category === selectedCategory && b.category !== selectedCategory) return -1;
          if (b.category === selectedCategory && a.category !== selectedCategory) return 1;
          return 0;
        });
      }

      setResults(filtered.slice(0, 8)); // Top 8 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, selectedCategory]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/help/article/${id}`);
  };

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-white" />
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (query.trim().length > 1) setIsOpen(true);
        }}
        placeholder={placeholder} 
        className="w-full h-full pl-12 pr-4 bg-white/20 text-white placeholder-white border border-black/10 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-white text-[14px] font-normal transition-all"
      />
      
      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-h-80 overflow-y-auto z-50 py-2">
          <div className="px-4 pb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-gray-100 mb-2">
            Resultados da Pesquisa
          </div>
          {results.map((article) => (
            <button
              key={article.id}
              onClick={() => handleSelect(article.id)}
              className="w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-[#f1ecff] transition-colors group"
            >
              <FileText className="w-5 h-5 text-zinc-400 group-hover:text-[#5025d1] mt-0.5 flex-shrink-0 transition-colors" />
              <div>
                <h4 className="text-[15px] font-medium text-black group-hover:text-[#5025d1] transition-colors line-clamp-1">
                  {article.title}
                </h4>
                <span className="text-xs text-zinc-500 mt-1 capitalize">
                  {article.category.replace('-', ' ')} • {article.readTime} de leitura
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results State */}
      {isOpen && query.trim().length > 1 && results.length === 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-6 text-center">
          <p className="text-[#18181a] font-medium mb-1">Nenhum resultado encontrado</p>
          <p className="text-sm text-zinc-500">Tente usar palavras-chave diferentes ou verifique a ortografia.</p>
        </div>
      )}
    </div>
  );
};
