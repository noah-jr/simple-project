
import { useParams, Link } from 'react-router-dom';
import { ARTICLES_BY_CATEGORY } from '../constants/articles';
import { Header } from '../../../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';

export const Article = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find article across all categories
  let foundArticle: { id: string; title: string; readTime: string } | null = null;
  let foundCategory: string | null = null;
  
  for (const [category, articles] of Object.entries(ARTICLES_BY_CATEGORY)) {
    const article = articles.find(a => a.id === id);
    if (article) {
      foundArticle = article;
      foundCategory = category;
      break;
    }
  }

  if (!foundArticle) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900">Artigo não encontrado</h2>
            <Link to="/help" className="mt-4 text-[#5025d1] hover:underline block">Voltar à Base de Conhecimento</Link>
          </div>
        </div>
      </div>
    );
  }

  // Format category name for breadcrumb
  const categoryName = foundCategory ? foundCategory.charAt(0).toUpperCase() + foundCategory.slice(1).replace('-', ' ') : 'Categoria';

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      
      <main className="w-full max-w-[960px] mx-auto px-4 md:px-[15px] pt-6 pb-20 flex-grow">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Base de Conhecimento', path: '/help' }, 
            { label: categoryName, path: `/help/category/${foundCategory}` },
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
                Atualizado há 15 dias • {foundArticle.readTime} de leitura
              </p>
            </header>

            <div className="prose prose-zinc max-w-none">
              <p className="text-base font-normal text-[#737373] mb-4">
                Este é um bloco de conteúdo de exemplo para o artigo "{foundArticle.title}". Num cenário real, este espaço seria preenchido com o conteúdo verdadeiro do artigo obtido do seu sistema ou base de dados.
              </p>
              
              <h2 className="text-2xl font-bold text-black my-6">1. Primeiros Passos</h2>
              <p className="text-base font-normal text-[#737373] mb-4">
                Para começar, precisará de iniciar sessão na sua conta e aceder ao painel de controlo. Certifique-se de que tem as suas credenciais prontas.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 my-4 text-base font-normal text-[#737373]">
                <li>Navegue para o painel principal.</li>
                <li>Selecione o domínio que deseja gerir.</li>
                <li>Clique na definição específica que pretende alterar.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black my-6">2. Configuração e Ajustes</h2>
              <p className="text-base font-normal text-[#737373] mb-4">
                Assim que estiver na página de definições, pode ajustar as configurações conforme necessário. Lembre-se sempre de guardar as alterações antes de sair da página.
              </p>
              
              <div className="my-8 bg-gray-100 rounded-lg h-64 w-full flex items-center justify-center border border-gray-200">
                <span className="text-gray-400">Imagem de Exemplo</span>
              </div>
              
              <p className="text-base font-normal text-[#737373] mb-4">
                Se encontrar algum problema, por favor <a href="#" className="text-[#5025d1] underline">contacte a nossa equipa de suporte</a> para obter assistência adicional.
              </p>
            </div>
          </article>

          {/* Right Column: Table of Contents (Sticky) */}
          <aside className="hidden md:block w-[245px]">
            <div className="sticky top-28">
              <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wider">Neste artigo</h3>
              <nav className="flex flex-col border-l-2 border-[#f2f2f2]">
                <a href="#" className="py-1.5 px-4 text-base font-normal text-black border-l-2 border-[#737373] -ml-[2px]">
                  1. Primeiros Passos
                </a>
                <a href="#" className="py-1.5 px-4 text-base font-normal text-[#737373] hover:text-black transition-colors">
                  2. Configuração e Ajustes
                </a>
                <a href="#" className="py-1.5 px-4 text-base font-normal text-[#737373] hover:text-black transition-colors">
                  Contactar Suporte
                </a>
              </nav>
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
};
