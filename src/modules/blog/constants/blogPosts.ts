export const FEATURED_POST = {
  id: 'featured-1',
  title: 'O Guia Completo para Aumentar a Velocidade do Seu Site WordPress',
  description: 'Descubra as melhores práticas e plugins essenciais para otimizar o tempo de carregamento do seu site e melhorar o SEO e a conversão de vendas instantaneamente.',
  category: 'WordPress',
  date: '28 Julho 2026',
  readTime: '8 min',
  author: 'Maria Silva',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
};

const basePosts = [
  {
    title: 'Como Configurar um Servidor VPS do Zero',
    description: 'Um passo a passo completo sobre como provisionar e proteger o seu primeiro servidor virtual privado usando a infraestrutura da Petrohost.',
    category: 'Engenharia',
    date: '25 Julho 2026',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '5 Tendências de Web Design para 2026',
    description: 'Explore as tendências de UI/UX que estão a redefinir a internet este ano, desde glassmorphism avançado até interfaces guiadas por IA.',
    category: 'Design',
    date: '22 Julho 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Porquê Migrar o Seu E-commerce para Angola',
    description: 'Descubra os benefícios de latência, suporte local e pagamentos móveis ao hospedar a sua loja online localmente.',
    category: 'Negócios',
    date: '20 Julho 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Introdução ao Docker na Petrohost',
    description: 'Aprenda a criar contentores e a implementar as suas aplicações de forma escalável e independente usando Docker.',
    category: 'Tutoriais',
    date: '18 Julho 2026',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'O que é um Certificado SSL e Como Instalar',
    description: 'Tudo o que precisa de saber sobre a encriptação de tráfego web e como ativar o seu certificado SSL gratuito.',
    category: 'Segurança',
    date: '15 Julho 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Histórias de Clientes: A Jornada da Kwanza-Connect',
    description: 'Veja como a Kwanza-Connect revolucionou os pagamentos online ao aliar-se à nossa infraestrutura robusta.',
    category: 'Clientes',
    date: '10 Julho 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export const BLOG_POSTS = Array.from({ length: 26 }).map((_, i) => ({
  ...basePosts[i % basePosts.length],
  id: `post-${i + 1}`,
  title: i < 6 ? basePosts[i % basePosts.length].title : `${basePosts[i % basePosts.length].title} (Parte ${Math.floor(i / 6) + 1})`,
}));
