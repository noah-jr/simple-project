import { useParams, Link } from 'react-router-dom';
import { useHelpArticle, useHelpArticleFeedback } from '../queries/useHelpQueries';
import { Header } from '../../../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useEffect, useState } from 'react';

export const Article = () => {
  const { id } = useParams<{ id: string }>(); // this is the slug
  
  const { data: foundArticle, isLoading } = useHelpArticle(id || '');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'success'>('idle');
  const feedbackMutation = useHelpArticleFeedback();

  const handleFeedback = (isHelpful: boolean) => {
    if (foundArticle) {
      feedbackMutation.mutate({ slug: foundArticle.slug || foundArticle.id.toString(), is_helpful: isHelpful });
      setFeedbackStatus('success');
    }
  };

  useEffect(() => {
    if (foundArticle) {
      document.title = `${foundArticle.title} | Ajuda PetroHost`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', foundArticle.excerpt || '');
    }
  }, [foundArticle]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-gray-500">A carregar artigo...</div>
        </div>
      </div>
    );
  }

  if (!foundArticle) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900">Artigo não encontrado</h2>
            <Link to="/help" className="mt-4 text-[#331c74] hover:underline block">Voltar à Base de Conhecimento</Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = foundArticle.category?.title || 'Categoria';
  const categorySlug = foundArticle.category?.slug || '';
  
  // Calculate read time roughly (200 words per minute)
  const wordCount = foundArticle.content ? foundArticle.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min';

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      <main className="w-full max-w-[960px] mx-auto px-4 md:px-[15px] pt-6 pb-20 flex-grow">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Base de Conhecimento', path: '/help' }, 
            { label: categoryName, path: `/help/category/${categorySlug}` },
            { label: foundArticle.title }
          ]} 
        />
        
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_245px] gap-8 mt-6">
          
          {/* Left Column: Article Content */}
          <article className="w-full">
            <header className="mb-8">
              <h1 className="text-[32px] font-bold text-black mb-2 leading-tight">
                {foundArticle.title}
              </h1>
              <p className="text-sm text-[#737373] mt-2">
                {new Date(foundArticle.updated_at).toLocaleDateString()} • {readTime} de leitura
              </p>
            </header>

            <div className="prose prose-zinc max-w-none prose-img:rounded-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {foundArticle.content}
              </ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between">
               {feedbackStatus === 'idle' ? (
                 <>
                   <p className="text-sm text-gray-500 mb-4 sm:mb-0">Este artigo foi útil?</p>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleFeedback(true)}
                        disabled={feedbackMutation.isPending}
                        className="px-4 py-2 bg-gray-50 hover:bg-[#5025d1] hover:text-white rounded text-sm font-medium transition-colors border border-gray-200 disabled:opacity-50"
                      >
                        👍 Sim
                      </button>
                      <button 
                        onClick={() => handleFeedback(false)}
                        disabled={feedbackMutation.isPending}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded text-sm font-medium transition-colors border border-gray-200 disabled:opacity-50"
                      >
                        👎 Não
                      </button>
                   </div>
                 </>
               ) : (
                 <p className="text-sm font-medium text-[#5025d1] bg-purple-50 px-4 py-2 rounded-md">Obrigado pelo seu feedback! A sua opinião ajuda-nos a melhorar.</p>
               )}
            </div>
          </article>

          {/* Right Column: Table of Contents (Sticky) */}
          <aside className="hidden md:block w-[245px]">
            <div className="sticky top-28">
              <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wider">Acerca deste artigo</h3>
              <div className="text-sm text-gray-600 mb-4">
                 Autor: {foundArticle.author?.name || 'Equipa Petrohost'}
              </div>
              <div className="text-sm text-gray-600">
                 Visualizações: {foundArticle.views}
              </div>
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
};
