
import { useParams, Link } from 'react-router-dom';

import { HELP_CATEGORIES } from '../constants/categories';
import { ARTICLES_BY_CATEGORY } from '../constants/articles';
import { Breadcrumb } from '../components/Breadcrumb';
import { ArticleList } from '../components/ArticleList';
import { Header } from '../../../components/Header';
import { CategorySelect } from '../components/CategorySelect';
import { SearchInput } from '../components/SearchInput';

export const Category = () => {
  const { id } = useParams<{ id: string }>();
  
  const category = HELP_CATEGORIES.find(c => c.id === id);
  const articles = id ? ARTICLES_BY_CATEGORY[id] || [] : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900">Categoria não encontrada</h2>
            <Link to="/help" className="mt-4 text-[#5025d1] hover:underline block">Voltar à Base de Conhecimento</Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-[#f5f6fb] font-sans flex flex-col">
      <Header />
      
      {/* Hero & Search Section */}
      <section className="w-full bg-[#673de6] py-16 px-4 flex justify-center">
        <div className="w-full max-w-[960px] flex gap-2 items-center justify-center flex-col md:flex-row">
          <div className="relative flex-1 max-w-[642px] h-10 w-full">
            <SearchInput />
          </div>

          <div className="relative w-full md:w-[280px] h-10 mt-2 md:mt-0">
            <CategorySelect />
          </div>
        </div>
      </section>

      <main className="w-full max-w-[960px] mx-auto px-[15px] pt-6 pb-20 flex-grow">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Base de Conhecimento', path: '/help' }, { label: category.title }]} />
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6 mb-8 mt-6">
          <div className="hidden md:flex flex-shrink-0">
            <Icon className="w-16 h-16 text-[#5025d1] stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">{category.title}</h1>
            <p className="text-zinc-600 text-base">{category.description}</p>
            <span className="text-sm text-zinc-500 mt-2 block">{articles.length} artigos</span>
          </div>
        </div>

        {/* Subcategory Box (Articles) */}
        <div className="bg-white border border-[#e2dbfc] rounded-lg p-3 mb-5">
          <h2 className="text-[22px] font-bold text-black px-3 pt-2 mb-3">Informações Gerais</h2>
          <div className="h-[1px] bg-[#e2dbfc] mx-3 mb-3"></div>
          <ArticleList articles={articles} />
        </div>
      </main>
    </div>
  );
};
