import React, { useState } from 'react';
import { ChevronDown, Phone, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src="https://petrohost.ao/logo-preto.svg" 
                alt="PetroHost Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/help" className="flex items-center text-slate-800 hover:text-primary font-medium text-sm py-8 transition-colors">
              Suporte
            </Link>
            <Link to="/blog" className="flex items-center text-slate-800 hover:text-primary font-medium text-sm py-8 transition-colors">
              Blogs
            </Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+244923000143" className="flex items-center text-slate-800 hover:text-primary transition-colors text-sm font-medium">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              +244 923 000 143
            </a>
            <a 
              href="https://petrohost.ao/auth/entrar" 
              className="flex items-center text-slate-800 hover:text-primary font-medium text-sm py-2 px-4 rounded-full border border-gray-200 hover:border-primary transition-all"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
