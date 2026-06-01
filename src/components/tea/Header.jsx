import { useState } from 'react';
import { Search, MessageSquare, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

// FIXED: Removed the import line for the image since it's in public/

export default function Header({ favoritesCount, onSearchChange, onFeedbackOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-xl border-b border-ink/6">
      <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3">
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0"
        >
          {/* FIXED: Changed from <ShopLogo /> component to a standard <img> tag */}
          <img 
            src="/PHSlogo.png" 
            alt="Pyi Htaung Hsu Logo" 
            className="w-10 h-10 object-contain" 
          />
        </motion.div>

        {/* Shop Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink leading-tight">
              Pyi Htaung Hsu
            </h1>
            {/* Myanmar flag mini-stripe */}
            <div className="flex flex-col gap-px ml-1">
              <div className="w-5 h-0.5 rounded-full bg-[#CE1126]" />
              <div className="w-5 h-0.5 rounded-full bg-[#FECB00]" />
              <div className="w-5 h-0.5 rounded-full bg-[#34A853]" />
            </div>
          </div>
          <p className="text-[10px] font-mono text-ink/35 tracking-[0.12em] uppercase">
            ✦ Traditional Tea House · Est. 2018
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-full hover:bg-ink/6 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Search menu"
          >
            <Search size={18} className="text-ink/60" />
          </button>

          <button
            onClick={onFeedbackOpen}
            className="p-2.5 rounded-full hover:bg-ink/6 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Give feedback"
          >
            <MessageSquare size={18} className="text-ink/60" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-honey rounded-full" />
          </button>

          <div className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <Heart size={18} className="text-ink/60" />
            {favoritesCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 min-w-[16px] min-h-[16px] bg-honey text-steam text-[9px] font-mono font-bold rounded-full flex items-center justify-center px-1"
              >
                {favoritesCount}
              </motion.span>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ink/5"
          >
            <div className="px-5 py-3 max-w-2xl mx-auto">
              <SearchBar onSearch={onSearchChange} onClose={() => setSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}