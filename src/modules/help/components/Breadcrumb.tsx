import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex text-sm text-zinc-600 mb-2">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/help" className="hover:text-[#5025d1] transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-zinc-400 font-serif">»</span>
            {item.path ? (
              <Link to={item.path} className="hover:text-[#5025d1] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
