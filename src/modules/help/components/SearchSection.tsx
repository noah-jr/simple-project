
import { motion } from 'framer-motion';
import { CategorySelect } from './CategorySelect';
import { SearchInput } from './SearchInput';

export const SearchSection = () => {
  return (
    <section className="w-full bg-[#673de6] text-white pt-[160px] md:pt-[200px] pb-[32px] px-4 md:px-[15px] flex justify-center">
      <div className="w-full max-w-[960px] flex flex-col gap-[24px]">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[28px] font-bold leading-normal text-white"
        >
          Conselhos e respostas da Equipa de Sucesso do Cliente
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-[8px] w-full h-auto md:h-[40px]"
        >
          {/* Search Input Container */}
          <div className="relative flex-grow h-[40px] md:h-full max-w-[642px]">
            <SearchInput />
          </div>

          {/* Category Select Dropdown */}
          <div className="relative w-full md:w-[280px] h-[40px] md:h-full mt-2 md:mt-0">
            <CategorySelect />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

