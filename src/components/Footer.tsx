
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export const Footer = () => {
  return (
    <footer className="w-full bg-[#f4f5ff] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Header Row (Logo & Social Links) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <Link to="/">
            <img src="https://petrohost.ao/images/logo.svg" alt="Petrohost Logo" className="h-10 object-contain" />
          </Link>
          <div className="flex items-center gap-5 text-[#2f1c6a]">
            <a href="https://www.facebook.com/petrohost/" target="_blank" rel="noreferrer" className="hover:text-[#5025d1] transition-colors" title="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.instagram.com/petrohost/" target="_blank" rel="noreferrer" className="hover:text-[#5025d1] transition-colors" title="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.youtube.com/@petrohost" target="_blank" rel="noreferrer" className="hover:text-[#5025d1] transition-colors" title="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/company/apetrohost/" target="_blank" rel="noreferrer" className="hover:text-[#5025d1] transition-colors" title="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://wa.me/244923000143" target="_blank" rel="noreferrer" className="hover:text-[#5025d1] transition-colors" title="Blog">
              <MessageCircle className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>

        {/* 8 Columns Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-10 mb-16">
          
          {/* Column 1: Soluções de Hospedagem */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Soluções de Hospedagem</h4>
            <ul className="space-y-3">
              <li><a href="/hospedagem" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem Compartilhada</a></li>
              <li>
                <a href="/hospedagem" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors flex flex-col items-start gap-1.5">
                  Hospedagem WordPress <span className="bg-[#5025d1] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold w-fit shadow-sm">Alimentado por IA</span>
                </a>
              </li>
              <li><a href="/vps" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem VPS</a></li>
              <li><a href="/vps" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem VDS</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem de Servidor Dedicado</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem Windows VPS</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem Mac</a></li>
            </ul>
          </div>

          {/* Column 2: Soluções de Domínio */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Soluções de Domínio</h4>
            <ul className="space-y-3">
              <li>
                <a href="/registro-dominios" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors flex flex-col items-start gap-1.5">
                  Nomes de domínio <span className="bg-[#5025d1] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold w-fit shadow-sm">Alimentado por IA</span>
                </a>
              </li>
              <li><a href="/registro-dominios" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Certificados SSL</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Verificador WHOIS</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Verificador de DNS de domínio</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Verificador de Domínio SSL</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Verificador de status de tempo de atividade</a></li>
            </ul>
          </div>

          {/* Column 3: Mais popular */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Mais popular</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem PHP</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem Linux</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem Node.js</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem CyberPanel</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">ispmanager Hospedagem</a></li>
            </ul>
          </div>

          {/* Column 4: INFORMAÇÃO */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5 uppercase">Informação</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Programa de Afiliados</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Centro de dados e servidores</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Métodos de Pagamento</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Avaliações</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Análise</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Parceiros</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Status dos servidores</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Migração de site gratuita</a></li>
            </ul>
          </div>

          {/* Column 5: Ajuda */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Ajuda</h4>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Suporte</Link></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Denunciar abuso</a></li>
              <li><Link to="/help" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Base de conhecimento</Link></li>
              <li><Link to="/blog" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Blog</Link></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Carreiras</a></li>
            </ul>
          </div>

          {/* Column 6: Serviços de hospedagem */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Serviços de hospedagem</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Revenda de Hospedagem</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem de Redes Sociais</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem de E-commerce</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem de e-mail</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem de CRM</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem Envato</a></li>
            </ul>
          </div>

          {/* Column 7: Comparar */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Comparar</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Bluehost vs. PetroHost</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">DreamHost vs. PetroHost</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Contabo vs. PetroHost</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Godaddy vs PetroHost</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">SiteGround vs. PetroHost</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors font-semibold">Comparar mais</a></li>
            </ul>
          </div>

          {/* Column 8: Tutoriais */}
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#2f1c6a] mb-5">Tutoriais</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Todos os tutoriais</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Tutoriais do WordPress</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Tutoriais de domínio</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Tutoriais de SEO</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Tutoriais de instruções</a></li>
              <li><a href="#" className="text-[14px] text-[#2f1c6a] hover:text-[#5025d1] transition-colors">Hospedagem de tutoriais em vídeo</a></li>
            </ul>
          </div>

        </div>

        {/* Horizontal Sub-Footer Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 py-8 border-t border-gray-200">
          <a href="/sobre" className="text-[14px] text-[#2f1c6a] font-semibold hover:text-[#5025d1] transition-colors">Sobre nós</a>
          <a href="/politica-reembolso" className="text-[14px] text-[#2f1c6a] font-semibold hover:text-[#5025d1] transition-colors">Política de reembolso</a>
          <a href="/termos-servicos" className="text-[14px] text-[#2f1c6a] font-semibold hover:text-[#5025d1] transition-colors">Termos e Condições</a>
          <a href="/politica-privacidade" className="text-[14px] text-[#2f1c6a] font-semibold hover:text-[#5025d1] transition-colors">Política de Privacidade</a>
          <a href="/juridico" className="text-[14px] text-[#2f1c6a] font-semibold hover:text-[#5025d1] transition-colors">Jurídico</a>
          <a href="/mapa-site" className="text-[14px] text-[#2f1c6a] font-semibold hover:text-[#5025d1] transition-colors">Mapa do site</a>
        </div>

        {/* Disclaimers & Copyright & Payments */}
        <div className="flex flex-col gap-6 py-8 border-t border-gray-200 text-[#737373] text-[13px] leading-relaxed">
          <p>
            Preços promocionais, se oferecidos, são apenas para o primeiro período, e apenas para novos clientes. Os planos são renovados a <a href="#" className="text-[#5025d1] hover:underline">preços regulares</a>.
          </p>
          <p>
            Apenas planos selecionados de Hospedagem Web e Hospedagem WordPress com períodos de faturamento de 1+ anos incluem 1 (um) registo gratuito de novo domínio ou transferência de domínio. Oferta válida apenas no momento da compra de hospedagem. Domínios são renovados após um ano às suas tarifas atuais. Oferta disponível apenas em <a href="#" className="text-[#5025d1] hover:underline">extensões de nome de domínio selecionadas</a>. Nota: Se a conta de hospedagem for cancelada no primeiro período, uma taxa de domínio não reembolsável será aplicada. A PetroHost reserva-se o direito de modificar ou encerrar a oferta a qualquer momento sem aviso. Para mais informações e uma lista de extensões elegíveis de nome de domínio, <a href="#" className="text-[#5025d1] hover:underline">leia nosso artigo da Base de Conhecimento</a>.
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-6">
            <p className="font-semibold text-[#2f1c6a]">
              © 2015–2026 PETROHOST PRES. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center gap-3">
              <img src="https://petrohost.ao/images/formas/logo-bai.svg" alt="BAI" className="h-6 object-contain" />
              <img src="https://petrohost.ao/images/formas/multicaixa-express.png" alt="Multicaixa Express" className="h-6 object-contain" />
              <img src="https://petrohost.ao/images/formas/multicaixa-referencia.png" alt="Multicaixa Referencia" className="h-6 object-contain bg-white px-1 rounded" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
