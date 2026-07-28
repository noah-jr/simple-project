import React from 'react';
import { Header } from '../../../components/Header';
import { SearchSection } from '../components/SearchSection';
import { CategoryCard } from '../components/CategoryCard';
import { HELP_CATEGORIES } from '../constants/categories';

export const HelpHome = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <SearchSection />
      
      <main className="flex-grow w-full max-w-[960px] mx-auto px-4 md:px-[15px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {HELP_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>

        {/* Recursos Adicionais Section */}
        <section className="mb-8">
          <h2 className="text-[24px] font-bold text-[#18181a] mb-6">Explore Mais Recursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f4f5ff] rounded-xl p-8 border border-[#e2dbfc] hover:border-[#5025d1] transition-colors cursor-pointer group">
              <h3 className="text-[20px] font-bold text-[#2f1c6a] mb-3">Academia Petrohost</h3>
              <p className="text-[#737373] text-[15px] mb-4">Descubra cursos gratuitos e masterclasses exclusivas para dominar a gestão de servidores, WordPress e marketing digital.</p>
              <span className="text-[#5025d1] font-semibold text-sm">Aceder à Academia →</span>
            </div>
            
            <div className="bg-[#f4f5ff] rounded-xl p-8 border border-[#e2dbfc] hover:border-[#5025d1] transition-colors cursor-pointer group">
              <h3 className="text-[20px] font-bold text-[#2f1c6a] mb-3">Tutoriais em Vídeo</h3>
              <p className="text-[#737373] text-[15px] mb-4">Aprenda de forma visual com a nossa biblioteca extensa de vídeos curtos ensinando a configurar a sua presença online passo a passo.</p>
              <span className="text-[#5025d1] font-semibold text-sm">Ver Tutoriais →</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
