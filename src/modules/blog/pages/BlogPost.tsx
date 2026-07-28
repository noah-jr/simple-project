import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Share2, Link2, ChevronLeft } from 'lucide-react';
import { Header } from '../../../components/Header';
import { FEATURED_POST, BLOG_POSTS } from '../constants/blogPosts';

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const blogCategories = ['Todos os Artigos', 'WordPress', 'Tutoriais', 'Engenharia', 'Design', 'Negócios', 'Clientes'];

  // Find post in either featured or regular list
  let post = BLOG_POSTS.find(p => p.id === id);
  if (!post && FEATURED_POST.id === id) {
    post = FEATURED_POST;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900">Artigo não encontrado</h2>
            <Link to="/blog" className="mt-4 text-[#5025d1] hover:underline block">Voltar ao Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for missing author/avatar on regular posts
  const author = (post as any).author || 'Equipa Petrohost';
  const authorAvatar = (post as any).authorAvatar || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80';

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      {/* Blog Navigation Bar */}
      <nav className="w-full bg-[#673de6] py-3 px-4 flex justify-center sticky top-20 z-40">
        <div className="w-full max-w-[1200px] flex items-center justify-between">
          <ul className="flex space-x-6 overflow-x-auto no-scrollbar items-center">
            {blogCategories.map((cat, idx) => (
              <li key={cat}>
                <Link to="/blog" className={`text-[15px] whitespace-nowrap transition-colors ${idx === 0 ? 'text-white font-semibold' : 'text-white/80 hover:text-white font-medium'}`}>
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
          <button className="text-white/80 hover:text-white p-1 ml-4 flex-shrink-0 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Article Content */}
      <main className="w-full flex-grow px-4 bg-white">
        <div className="max-w-[730px] mx-auto pt-16 pb-20">
          
          {/* Metadata Row (Category Pill + Date + Author) */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-semibold text-[#331c74] bg-[#d5dfff] px-[10px] py-[1px] rounded-[20px] text-[14px]">
              {post.category}
            </span>
            <span className="text-[15px] text-zinc-500 font-normal">
              {post.date} por {author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[32px] md:text-[46px] font-bold text-[#331c74] leading-[1.2] md:leading-[50.6px] mb-[33.6px]">
            {post.title}
          </h1>

          {/* Featured Image */}
          <div className="w-full rounded-[10px] overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Sharing & AI Summary Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 mb-8 gap-4 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-[#6d7081]">Summarize with:</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold bg-[#f5f6fb] hover:bg-[#e2dbfc] text-[#331c74] rounded-[6px] transition-colors">ChatGPT</button>
                <button className="px-3 py-1.5 text-xs font-semibold bg-[#f5f6fb] hover:bg-[#e2dbfc] text-[#331c74] rounded-[6px] transition-colors">Claude.ai</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[14px] text-[#6d7081]">Share:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f6fb] hover:bg-[#e2dbfc] text-[#331c74] transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors font-bold text-[10px]">
                  X
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors font-bold text-[10px]">
                  fb
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] transition-colors font-bold text-[10px]">
                  in
                </button>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <article className="prose prose-lg prose-zinc max-w-none">
            <p className="text-[18px] text-[#424242] font-normal leading-relaxed mb-6">
              Este é um texto de exemplo para demonstrar a estrutura visual do artigo. No futuro, este espaço será preenchido com o conteúdo dinâmico extraído da base de dados.
            </p>
            
            <h2 className="text-[28px] font-bold text-[#331c74] mt-12 mb-6">O que precisa de saber antes de começar</h2>
            
            <p className="text-[18px] text-[#424242] font-normal leading-relaxed mb-6">
              A implementação de uma nova infraestrutura requer planeamento rigoroso e uma estratégia bem definida. Ao seguir estas melhores práticas, garante não apenas o sucesso da integração mas também a sustentabilidade a longo prazo.
            </p>

            <ul className="list-disc pl-6 space-y-3 my-8 text-[18px] text-[#424242]">
              <li><strong>Análise de Requisitos:</strong> Defina exatamente o que a sua aplicação precisa.</li>
              <li><strong>Escolha do Fornecedor:</strong> Opte por servidores locais (como a Petrohost) para menor latência.</li>
              <li><strong>Monitorização:</strong> Implemente alertas para picos de tráfego.</li>
            </ul>

            <h3 className="text-[22px] font-bold text-[#331c74] mt-10 mb-4">Passos Seguintes</h3>
            
            <p className="text-[18px] text-[#424242] font-normal leading-relaxed mb-6">
              Certifique-se de realizar testes exaustivos num ambiente isolado antes de passar qualquer configuração para produção. Pode sempre recorrer à nossa <Link to="/help" className="text-[#673de6] font-semibold no-underline hover:underline">Base de Conhecimento</Link> caso surjam dúvidas no processo.
            </p>
            
            <div className="bg-[#f5f6fb] p-6 rounded-[10px] border border-[#d5dfff] my-8">
              <h4 className="text-[18px] font-bold text-[#331c74] mb-2">Dica Profissional</h4>
              <p className="text-[16px] text-[#424242] m-0">A segurança deve ser sempre uma prioridade. Configure uma Firewall e mantenha as portas SSH fechadas para IPs desconhecidos.</p>
            </div>
          </article>

          {/* Author Section Box */}
          <div className="col-12 bg-[#f8f9fa] rounded-[20px] p-[30px] md:p-[50px] mt-[40px] flex flex-col md:flex-row items-center md:items-start gap-8">
            <img 
              src={authorAvatar} 
              alt={author} 
              className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0"
            />
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[12px] font-bold text-[#6d7081] tracking-[1.5px] uppercase mb-2">
                O Autor
              </span>
              <h3 className="text-[32px] md:text-[44px] font-bold text-[#331c74] mb-4 leading-tight">
                {author}
              </h3>
              <p className="text-[18px] md:text-[20px] text-[#424242] font-normal mb-4">
                Especialista em infraestruturas Cloud e engenharia de software com mais de uma década de experiência no desenvolvimento de sistemas distribuídos na Petrohost.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a href="#" className="text-[#6747c7] font-semibold hover:underline text-[15px]">
                  LinkedIn
                </a>
                <span className="text-zinc-300">•</span>
                <a href="#" className="text-[#6747c7] font-semibold hover:underline text-[15px]">
                  Mais de {author}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
