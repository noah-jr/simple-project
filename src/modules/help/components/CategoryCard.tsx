import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, title, description, icon: Icon, count }) => {
  return (
    <Link 
      to={`/help/category/${id}`}
      className="group flex flex-col items-center justify-center text-center w-full h-[245px] p-3 bg-white border border-[#e2dbfc] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-100 ease-in-out hover:border-[#5025d1]"
    >
      {/* Icon Container */}
      <div className="pt-10 pb-2 flex justify-center items-center h-16">
        <Icon className="w-12 h-12 text-[#5025d1] stroke-[1.5]" />
      </div>
      
      {/* Content Container */}
      <div className="py-4 flex-grow flex flex-col justify-center">
        <h3 className="text-base font-semibold text-[#18181a] mb-0.5 leading-6 transition-colors duration-100 group-hover:text-[#5025d1]">
          {title}
        </h3>
        <p className="text-[15px] font-normal text-[#18181a] line-clamp-3 overflow-hidden px-2">
          {description}
        </p>
      </div>
      
      {/* Count */}
      <span className="block mt-4 text-sm text-[#6d7081]">
        {count} artigos
      </span>
    </Link>
  );
};

