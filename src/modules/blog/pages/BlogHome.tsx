import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Header } from '../../../components/Header';
import { useBlogPosts, useBlogCategories } from '../queries/useBlogQueries';

export const BlogHome = () => {
  const { data: categories = [] } = useBlogCategories();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Todos os Artigos');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Debounce search query and Update SEO Title
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 400);

    // Update document title dynamically based on view
    if (searchQuery) {
      document.title = `Pesquisa: ${searchQuery} | Blog PetroHost`;
    } else if (activeCategory !== 'Todos os Artigos') {
      document.title = `${activeCategory} | Blog PetroHost`;
    } else {
      document.title = 'Blog | PetroHost';
    }

    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory]);

  const apiCategory = activeCategory === 'Todos os Artigos' ? undefined : activeCategory;
  const { data: posts = [], isLoading } = useBlogPosts(apiCategory, debouncedSearch);

  const blogCategories = ['Todos os Artigos', ...categories.map(c => c.name)];
  
  const isDefaultView = activeCategory === 'Todos os Artigos' && debouncedSearch === '';
  const postsPerPage = 6; // Matching a reasonable grid size
  
  // Logic for Featured Post (only on page 1 of default view)
  const featuredPost = (isDefaultView && currentPage === 1) ? (posts.find(p => p.is_featured) || posts[0]) : null;
  
  // All other posts
  const remainingPosts = posts.filter(p => p.id !== featuredPost?.id);
  
  // Pagination calculation
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);
  const currentPosts = remainingPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const getReadTime = (content: string) => {
    const wordCount = content ? content.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(wordCount / 200)) + ' min';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        if (scrollRef.current) {
          const top = scrollRef.current.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      {/* Hostinger-style Sub-navigation */}
      <nav className={`transition-all duration-300 sticky top-20 z-40 ${isSearchOpen ? 'bg-white shadow-sm' : 'bg-[#7b66ff]'}`}>
        <div className="max-w-[1120px] mx-auto px-4 md:px-8">
          {!isSearchOpen ? (
            <div className="flex items-center justify-between py-[15px] md:py-[20px]">
              <ul className="flex flex-row items-center gap-[24px] overflow-x-auto whitespace-nowrap no-scrollbar">
                {blogCategories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => { setActiveCategory(category); setCurrentPage(1); }}
                      className={`text-[17px] transition-opacity ${
                        activeCategory === category 
                          ? 'text-white font-bold' 
                          : 'text-white/80 font-semibold hover:opacity-80'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="ml-auto flex items-center p-1 text-white hover:opacity-60 transition-opacity"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="flex items-center w-full h-[74px]">
              <input 
                type="text"
                autoFocus
                placeholder="Pesquisar artigos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent text-[#58585e] text-[20px] px-4 py-2 focus:outline-none placeholder:text-zinc-400"
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  if (searchQuery === '') setActiveCategory('Todos os Artigos');
                }}
                className="text-[#331c74] hover:text-[#7b66ff] transition-colors p-2 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          )}
        </div>
      </nav>

      {isLoading ? (
         <div className="flex-grow flex items-center justify-center text-[#58585e] py-20">A carregar artigos...</div>
      ) : (
        <main className="flex-grow">
          
          <div ref={scrollRef}></div>

          {/* Hostinger-style Hero / Featured Post Section */}
          {featuredPost && (
            <section className="bg-white max-w-[1120px] mx-auto px-4 md:px-8 py-8 md:py-12 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row items-center gap-[30px] w-full">
                <div className="w-full lg:w-7/12">
                  <Link to={`/blog/${featuredPost.slug || featuredPost.id}`} className="block aspect-[16/9] w-full rounded-[10px] overflow-hidden">
                    <img 
                      src={featuredPost.image_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'} 
                      alt={featuredPost.title} 
                      className="object-cover w-full h-full"
                    />
                  </Link>
                </div>
                <div className="w-full lg:w-5/12 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[#58585e] font-extrabold text-[16px] uppercase tracking-wider mb-[10px]">
                    História em Destaque
                  </span>
                  <h2 className="text-[24px] font-bold text-[#331c74] leading-[36px] mb-2 group">
                    <Link to={`/blog/${featuredPost.slug || featuredPost.id}`} className="hover:text-[#7b66ff] transition-colors duration-200">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-[#797980] text-[18px] font-normal leading-[25px] mt-[10px] line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center mt-[30px]">
                    <img 
                      src={featuredPost.author?.avatar || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=128&q=80'} 
                      alt={featuredPost.author?.name || 'Equipa Petrohost'} 
                      className="w-[56px] h-[56px] rounded-full object-cover"
                    />
                    <div className="pl-[20px] flex flex-col items-start">
                      <span className="text-[#331c74] text-[16px] font-extrabold">{featuredPost.author?.name || 'Equipa Petrohost'}</span>
                      <span className="text-[#58585e] text-[17px] font-normal">{formatDate(featuredPost.published_at)} • {getReadTime(featuredPost.content)} de leitura</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Posts Grid & Search Results */}
          <section className="max-w-[1120px] mx-auto px-4 md:px-8 py-12 md:py-16">
            {!isDefaultView && (
              <h2 className="text-[28px] md:text-[32px] font-bold text-[#331c74] mb-10 border-b border-gray-100 pb-4">
                {debouncedSearch 
                  ? `Resultados de pesquisa para "${debouncedSearch}"` 
                  : `Artigos em: ${activeCategory}`
                }
              </h2>
            )}

            {currentPosts.length === 0 ? (
              <div className="text-center py-20 text-[#797980] text-lg">
                Nenhum artigo encontrado.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                {currentPosts.map((post) => (
                  <article key={post.id} className="flex flex-col cursor-pointer pb-[25px]">
                    <Link to={`/blog/${post.slug || post.id}`} className="block aspect-[1.7/1] w-full rounded-[10px] overflow-hidden mb-[15px]">
                      <img 
                        src={post.image_url || 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80'} 
                        alt={post.title} 
                        className="object-cover w-full h-full" 
                      />
                    </Link>
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center justify-between text-[#331c74] font-extrabold text-[14px] uppercase mb-[10px]">
                        <span className="text-zinc-500">{formatDate(post.published_at)}</span>
                        <span className="hover:text-[#472d94] transition-colors">{post.category?.name || 'Geral'}</span>
                      </div>
                      <Link to={`/blog/${post.slug || post.id}`}>
                        <h5 className="text-[21px] font-bold text-[#331c74] leading-[25.2px] mb-[10px] hover:text-[#7b66ff] transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h5>
                      </Link>
                      <p className="text-[#58585e] text-[14px] font-normal leading-[21px] line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
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
                        className={`w-10 h-10 rounded-[6px] font-bold text-[15px] flex items-center justify-center transition-colors ${
                          currentPage === pageNum 
                            ? 'bg-[#7b66ff] text-white' 
                            : 'bg-[#f5f6fb] hover:bg-[#7b66ff] hover:text-white text-[#331c74]'
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
                  className={`px-4 h-10 rounded-[6px] font-bold text-[15px] flex items-center justify-center transition-colors ml-2 ${
                    currentPage === totalPages 
                      ? 'bg-transparent text-zinc-400 cursor-not-allowed' 
                      : 'bg-[#f5f6fb] hover:bg-[#7b66ff] hover:text-white text-[#331c74]'
                  }`}
                >
                  Seguinte &rarr;
                </button>
              </div>
            )}
          </section>

          {/* All Stories (Vertical text-only feed / by row) */}
          <section className="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16 border-t border-gray-100 mt-10">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#331c74] mb-10">Todas as Histórias</h2>
            <div className="flex flex-col gap-8">
              {remainingPosts.slice(postsPerPage).slice(0, 10).map((post) => (
                <div key={post.id} className="flex flex-col items-start gap-4 pb-8 border-b border-gray-100 last:border-0 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-[#331c74] text-[14px] font-extrabold uppercase tracking-wider">
                      {formatDate(post.published_at)}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-[#7b66ff] text-[14px] font-extrabold uppercase tracking-wider cursor-pointer hover:text-[#331c74] transition-colors" onClick={(e) => { e.stopPropagation(); setActiveCategory(post.category?.name || 'Todos os Artigos'); setCurrentPage(1); window.scrollTo(0,0); }}>
                      {post.category?.name || 'Geral'}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug || post.id}`} className="w-full">
                    <h3 className="text-[22px] md:text-[24px] font-bold text-[#331c74] group-hover:text-[#7b66ff] transition-colors leading-[1.3]">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-[#58585e] text-[16px] leading-[24px] line-clamp-2 w-full max-w-[800px]">
                    {post.description}
                  </p>
                </div>
              ))}
            </div>
            {remainingPosts.length > postsPerPage && (
              <div className="flex justify-center mt-10">
                <button 
                  onClick={() => handlePageChange(2)}
                  className="bg-transparent border-2 border-[#e1d9ff] hover:bg-[#7b66ff] text-[#331c74] hover:text-white font-bold text-[16px] px-8 py-3 rounded-[6px] transition-all"
                >
                  Carregar Mais Artigos
                </button>
              </div>
            )}
          </section>

          {/* Hostinger-style CTA Banner */}
          <section className="bg-[#1c1c38] text-white py-[70px] md:py-[100px] flex items-center justify-center mt-10">
            <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-[35px]">Faça parte da revolução Petrohost!</h2>
              <Link to="/help" className="bg-[#ff3f65] hover:bg-[#ff2550] text-white font-semibold text-[16px] md:text-[18px] px-8 py-3.5 rounded-md transition-colors duration-200">
                Começar Agora
              </Link>
            </div>
          </section>

        </main>
      )}
    </div>
  );
};
