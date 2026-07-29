
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Logo & Navigation */}
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img 
                  src="https://petrohost.ao/logo-preto.svg" 
                  alt="PetroHost Logo" 
                  className="h-9 w-auto"
                />
              </Link>
            </div>

            {/* Left Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/help" className="flex items-center text-gray-500 hover:text-gray-700 font-medium text-[15px] py-8 transition-colors">
                Suporte
              </Link>
              <Link to="/blog" className="flex items-center text-gray-500 hover:text-gray-700 font-medium text-[15px] py-8 transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex flex-col items-end justify-center">
              <span className="text-[#737373] text-[11.5px] leading-tight">Apoio ao cliente</span>
              <a href="tel:+244923000143" className="text-[#00479e] hover:text-[#0e3f7b] transition-colors text-[14px] font-bold leading-tight mt-0.5 tracking-tight">
                +244 923 000 143
              </a>
            </div>
            
  
          </div>
        </div>
      </div>
    </header>
  );
};
