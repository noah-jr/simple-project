import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { HELP_CATEGORIES } from '../constants/categories';
import { useNavigate, useLocation } from 'react-router-dom';

export const CategorySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current category based on URL
  const currentPath = location.pathname;
  let selectedId = '';
  if (currentPath.startsWith('/help/category/')) {
    selectedId = currentPath.split('/help/category/')[1];
  }

  const selectedCategory = HELP_CATEGORIES.find(c => c.id === selectedId);
  const displayLabel = selectedCategory ? selectedCategory.title : 'Pesquisar em todas as categorias';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (categoryId: string) => {
    setIsOpen(false);
    if (categoryId === '') {
      navigate('/help');
    } else {
      navigate(`/help/category/${categoryId}`);
    }
  };

  return (
    <div className="relative w-full md:w-[280px] h-full" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full px-4 bg-white text-[#18181a] border border-black/10 rounded-lg flex items-center justify-between text-[14px] font-normal focus:outline-none hover:bg-gray-50 transition-colors"
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown className={`h-4 w-4 text-[#18181a] ml-2 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto py-1">
          <button
            onClick={() => handleSelect('')}
            className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedId === '' ? 'text-[#5025d1] font-medium' : 'text-zinc-700'}`}
          >
            Pesquisar em todas as categorias
            {selectedId === '' && <Check className="w-4 h-4 text-[#5025d1]" />}
          </button>
          
          {HELP_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${selectedId === category.id ? 'text-[#5025d1] font-medium' : 'text-zinc-700'}`}
            >
              <span className="truncate">{category.title}</span>
              {selectedId === category.id && <Check className="w-4 h-4 text-[#5025d1]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
