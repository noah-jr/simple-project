import { useParams, Link } from 'react-router-dom';
import { Search, Link2 } from 'lucide-react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useBlogPost, useBlogCategories } from '../queries/useBlogQueries';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useEffect } from 'react';

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>(); // This is slug
  
  const { data: categories = [] } = useBlogCategories();
  const blogCategories = ['Todos os Artigos', ...categories.map(c => c.name)];
  
  const { data: post, isLoading } = useBlogPost(id || '');

  useEffect(() => {
    if (post) {
      document.title = post.meta_title ? `${post.meta_title} | PetroHost` : `${post.title} | PetroHost Blog`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.meta_description || post.description || '');
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center text-gray-500">
          A carregar artigo...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900">Artigo não encontrado</h2>
            <Link to="/blog" className="mt-4 text-[#331c74] hover:underline block">Voltar ao Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  const authorName = post.author?.name || 'Equipa Petrohost';
  const authorAvatar = post.author?.avatar || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=128&q=80';
  
  const formattedDate = new Date(post.published_at).toLocaleDateString('pt-PT', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleShare = (platform: 'copy' | 'twitter' | 'linkedin') => {
    const url = window.location.href;
    const title = post.title;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      {/* Sub-navigation */}
      <nav className="transition-all duration-300 sticky top-20 z-40 bg-[#5025d1]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-[15px] md:py-[20px]">
            <ul className="flex flex-row items-center gap-[24px] overflow-x-auto whitespace-nowrap no-scrollbar">
              {blogCategories.map((category, idx) => (
                <li key={category}>
                  <Link to="/blog" className={`text-[17px] transition-opacity ${idx === 0 ? 'text-white font-bold' : 'text-white/80 font-semibold hover:opacity-80'}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="ml-auto flex items-center p-1 text-white hover:opacity-60 transition-opacity">
              <Search className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hostinger-style Single Blog Post Layout */}
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-[40px] md:py-[65px] flex-grow">
        <div className="grid grid-cols-12 gap-6">
          <article className="col-span-12 md:col-start-3 md:col-span-8 flex flex-col px-0 sm:px-4">
            
            <header className="mb-8">
              <div className="text-[#58585e] text-[14px] md:text-[15px] font-medium mb-4 capitalize">
                {formattedDate} • Por {authorName}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[44px] leading-[1.1] font-extrabold text-[#331c74]">
                {post.title}
              </h1>
            </header>

            {/* Featured Image */}
            {(post.cover_image_url || post.image_url) && (
               <div className="w-full rounded-[10px] overflow-hidden mb-10">
                 <img 
                   src={post.cover_image_url || post.image_url} 
                   alt={post.title} 
                   className="w-full h-auto object-cover"
                 />
               </div>
            )}

            {/* Social Share Toolbar (Minimal) */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-8">
              <span className="text-[14px] text-[#58585e] font-semibold uppercase tracking-wider">Partilhar:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare('copy')}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fa] hover:bg-[#5025d1] hover:text-white text-[#331c74] transition-colors border border-gray-200"
                  title="Copiar Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fa] hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] transition-colors border border-gray-200 font-bold text-[10px]"
                  title="Partilhar no X (Twitter)"
                >
                  X
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fa] hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] transition-colors border border-gray-200 font-bold text-[10px]"
                  title="Partilhar no LinkedIn"
                >
                  in
                </button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose max-w-none text-[#58585e] text-[17px] md:text-[18px] leading-[1.7] space-y-6 prose-headings:text-[#331c74] prose-headings:font-bold prose-h2:text-[28px] prose-h2:mt-12 prose-h3:text-[22px] prose-a:text-[#331c74] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Gallery Section */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-[24px] font-bold text-[#331c74] mb-6">Galeria de Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {post.gallery.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-2">
                      {item.type === 'video' ? (
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          {item.url.includes('youtube') || item.url.includes('youtu.be') ? (
                            <iframe 
                              src={item.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen 
                            />
                          ) : (
                            <video src={item.url} controls className="w-full h-full object-cover" />
                          )}
                        </div>
                      ) : (
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={item.url} alt={item.caption || `Imagem ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      {item.caption && (
                        <p className="text-[14px] text-gray-500 text-center italic mt-1">{item.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Section Box */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-start gap-6">
              <img 
                src={authorAvatar} 
                alt={authorName} 
                className="w-[80px] h-[80px] rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#797980] tracking-[1px] uppercase mb-1">
                  O Autor
                </span>
                <h3 className="text-[24px] font-bold text-[#331c74] mb-2">
                  {authorName}
                </h3>
                <p className="text-[16px] text-[#58585e] font-normal leading-relaxed">
                  Especialista em infraestruturas Cloud e engenharia de software com experiência no desenvolvimento de sistemas web de alta performance na Petrohost.
                </p>
              </div>
            </div>

          </article>
        </div>
      </main>

      {/* Hostinger-style CTA Banner */}
      <section className="bg-[#1c1c38] text-white py-[70px] flex items-center justify-center mt-10">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold mb-[30px]">Comece a sua jornada online connosco</h2>
          <Link to="/help" className="bg-[#ff3f65] hover:bg-[#ff2550] text-white font-semibold text-[16px] px-8 py-3.5 rounded-md transition-colors duration-200">
            Criar um site
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
