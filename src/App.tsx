import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelpHome } from './modules/help/pages/HelpHome';
import { Category } from './modules/help/pages/Category';
import { Article } from './modules/help/pages/Article';
import { BlogHome } from './modules/blog/pages/BlogHome';
import { BlogPost } from './modules/blog/pages/BlogPost';
import { Footer } from './components/Footer';

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/blog')) {
      document.title = 'Blog - PetroHost';
    } else if (location.pathname.startsWith('/help')) {
      document.title = 'Suporte - PetroHost';
    } else {
      document.title = 'PetroHost - Centro de Ajuda e Blog';
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <TitleUpdater />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/help" replace />} />
            <Route path="/help" element={<HelpHome />} />
            <Route path="/help/category/:id" element={<Category />} />
            <Route path="/help/article/:id" element={<Article />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
