import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { FEATURED_POST, BLOG_POSTS } from '../constants/blogPosts';

export const BlogHome = () => {
  const blogCategories = ['Todos os Artigos', 'WordPress', 'Tutoriais', 'Engenharia', 'Design', 'Negócios', 'Clientes'];
  
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Todos os Artigos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const postsPerPage = 6;
  
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'Todos os Artigos' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const allStoriesRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optional: slight delay to ensure render
      setTimeout(() => {
        const offset = 100; // Account for sticky header
        const element = allStoriesRef.current;
        if (element) {
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 10);
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const isDefaultView = activeCategory === 'Todos os Artigos' && searchQuery === '';

  return (
    <div className="min-h-screen bg-[#f5f6fb] font-sans flex flex-col">
      <Header />
      {/* Blog Navigation */}
      <nav className={`transition-all duration-300 sticky top-16 z-40 ${isSearchOpen ? 'bg-white shadow-sm' : 'bg-[#673de6]'}`}>
        <div className="max-w-[1200px] mx-auto px-4">
          {!isSearchOpen ? (
            <div className="flex items-center justify-between h-[65px]">
              <div className="flex space-x-10 overflow-x-auto no-scrollbar items-center">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`whitespace-nowrap text-[17px] font-semibold transition-colors ${activeCategory === category ? 'text-white border-b-2 border-white pb-[2px]' : 'text-white/80 hover:text-white'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-white/80 transition-colors ml-auto p-2"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="flex items-center w-full h-[90px]">
              <input 
                type="text"
                autoFocus
                placeholder="Introduza a sua pesquisa (VPS, domínio, hospedagem...)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-grow bg-transparent text-[#58585e] text-[20px] px-4 py-2 focus:outline-none placeholder:text-zinc-400"
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  if (searchQuery === '') {
                    setActiveCategory('Todos os Artigos');
                  }
                }}
                className="text-[#331c74] hover:text-[#5025d1] transition-colors p-2 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Conditional rendering: Only show Featured and Promo sections if not filtering/searching */}
      {isDefaultView ? (
        <>
          {/* Hero / Featured Post Section */}
          <section className="w-full bg-white pt-16 pb-20 px-4 flex justify-center border-b border-gray-100">
            <div className="w-full max-w-[1200px]">
              <Link to={`/blog/${FEATURED_POST.id}`} className="group grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Image */}
                <div className="w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    src={FEATURED_POST.image} 
                    alt={FEATURED_POST.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
            </div>
            
            {/* Right: Content */}
            <div className="flex flex-col justify-center pr-4 md:pr-12">
              <span className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-4">
                História em Destaque
              </span>
              <h1 className="text-[32px] md:text-[44px] leading-tight font-bold text-[#2f1c6a] mb-4">
                {FEATURED_POST.title}
              </h1>
              <p className="text-lg text-[#737373] mb-8 line-clamp-3">
                {FEATURED_POST.description}
              </p>
              
              <div className="flex items-center">
                <img 
                  src={FEATURED_POST.authorAvatar} 
                  alt={FEATURED_POST.author} 
                  className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[#2f1c6a]">{FEATURED_POST.author}</span>
                  <span className="text-xs text-zinc-500">{FEATURED_POST.date} • {FEATURED_POST.readTime} de leitura</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Top Stories Section */}
      <section className="w-full max-w-[1200px] mx-auto px-4 py-16">
        <h2 className="text-[28px] font-bold text-black mb-8">Histórias Principais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col items-start cursor-pointer">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-5">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-wrap items-center text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                <span className="text-[#5025d1]">{post.category}</span>
                <span className="mx-2 text-zinc-300">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-[#2f1c6a] mb-2 leading-tight line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[15px] text-[#737373] line-clamp-3">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Clientes de Sucesso Section (Image overlays) */}
      <section className="w-full bg-[#f8f9fa] py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-[28px] font-bold text-black mb-8">Clientes em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/blog/featured-1" className="group relative w-full h-[400px] rounded-[16px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Clientes" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-2">Caso de Sucesso</span>
                <h3 className="text-white text-[32px] font-bold leading-tight mb-2">156K+ visitantes no mês de estreia</h3>
                <p className="text-white/80 text-sm">Leia a história do estúdio que migrou para a Petrohost.</p>
              </div>
            </Link>
            <Link to="/blog/post-1" className="group relative w-full h-[400px] rounded-[16px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="E-commerce" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-2">E-commerce</span>
                <h3 className="text-white text-[32px] font-bold leading-tight mb-2">Vendas online aumentaram 300%</h3>
                <p className="text-white/80 text-sm">A escalabilidade da Cloud VPS posta à prova.</p>
              </div>
            </Link>
            <Link to="/blog/post-2" className="group relative w-full h-[400px] rounded-[16px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Agência" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-2">Agências</span>
                <h3 className="text-white text-[32px] font-bold leading-tight mb-2">Gestão de 50+ sites num só painel</h3>
                <p className="text-white/80 text-sm">Como as agências angolanas estão a revolucionar o seu workflow.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WordPress Section */}
      <section className="w-full max-w-[1200px] mx-auto px-4 py-16 border-b border-gray-100">
        <h2 className="text-[28px] font-bold text-black mb-8">Notícias WordPress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {BLOG_POSTS.slice(3, 6).map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group flex flex-col items-start cursor-pointer">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-5">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-wrap items-center text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                <span className="text-[#5025d1]">{post.category}</span>
                <span className="mx-2 text-zinc-300">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-[#2f1c6a] mb-2 leading-tight line-clamp-2">
                {post.title}
              </h3>
              <p className="text-[15px] text-[#737373] line-clamp-3">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
      </>) : null}

      {/* All Stories (Vertical List) or Search Results */}
      <section className="w-full max-w-[900px] mx-auto px-4 py-16" ref={allStoriesRef}>
        <h2 className="text-[28px] font-bold text-black mb-10">
          {!isDefaultView ? (
            searchQuery ? `Resultados de pesquisa para "${searchQuery}"` : `Artigos em: ${activeCategory}`
          ) : (
            "Todas as Histórias"
          )}
        </h2>
        
        {currentPosts.length === 0 ? (
          <div className="text-center py-20 text-[#737373] text-lg">
            Nenhum artigo encontrado para a sua pesquisa.
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {currentPosts.map((post, idx) => (
              <div key={`all-${idx}`} className="flex flex-col md:flex-row gap-6 items-start pb-10 border-b border-gray-100 last:border-0">
                <div className="flex-grow">
                  <Link to={`/blog/${post.id}`} className="group block">
                    <h3 className="text-[24px] font-bold text-[#2f1c6a] mb-3 leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-[16px] text-[#737373] mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex items-center text-sm text-zinc-500 font-medium">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>por Equipa Petrohost</span>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <span className="font-semibold text-[#331c74] bg-[#d5dfff] px-[12px] py-[4px] rounded-[20px] text-[13px]">
                    {post.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              if (
                pageNum === 1 || 
                pageNum === totalPages || 
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button 
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-[#673de6] text-white' 
                        : 'hover:bg-gray-100 text-[#2f1c6a]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 || 
                pageNum === currentPage + 2
              ) {
                return <span key={`ellipsis-${pageNum}`} className="px-2 text-zinc-400">...</span>;
              }
              return null;
            })}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 h-10 rounded-full font-bold flex items-center justify-center transition-colors ml-2 ${
                currentPage === totalPages 
                  ? 'text-zinc-400 cursor-not-allowed' 
                  : 'hover:bg-gray-100 text-[#2f1c6a]'
              }`}
            >
              Seguinte &rarr;
            </button>
          </div>
        )}
      </section>

      {/* CTA Banner Section */}
      <section className="w-full bg-[#673de6] py-20 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6">Junte-se à revolução digital em Angola</h2>
        <p className="text-[18px] md:text-[20px] text-white/90 mb-10 max-w-[600px]">
          Milhares de empresas angolanas confiam na Petrohost para colocar as suas ideias online com servidores rápidos e seguros.
        </p>
        <Link to="/help" className="bg-[#fc5185] hover:bg-[#ff3b75] text-white text-[16px] font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-lg">
          Começar Agora
        </Link>
      </section>
    </div>
  );
};
