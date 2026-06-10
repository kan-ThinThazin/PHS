import { useState, useEffect, useRef } from 'react';
import menuData from '../../data/menu.json';
import { Search, MessageSquare, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

export default function Header({ favoritesCount, favorites = [], onSearchChange, onFeedbackOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  // Dynamically broadcast height changes to the DOM layout engine
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeight();
    
    // Watch resize events for devices like Z Fold 5 unfolding
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [searchOpen, favOpen]);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const allItems = Object.values(menuData.items).flat();
  const favItems = allItems.filter((item) => favorites.includes(item.id));

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-white/97 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)]' : 'bg-parchment/90 backdrop-blur-xl border-b border-ink/6'
      }`}
    >
      <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3 relative z-50">
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0 cursor-pointer"
        >
          <img src="/PHS.png" alt="Logo" className="h-12 w-auto object-contain" />
        </motion.div>

        {/* Shop Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <motion.h1 
              animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              style={{
                backgroundImage: 'linear-gradient(to right, #CE1126, #FECB00, #34A853, #CE1126)',
                backgroundSize: '200% auto',
              }}
              className="font-serif text-lg sm:text-xl font-bold tracking-tight bg-clip-text text-transparent leading-tight"
            >
              Pyi Htaung Hsu
            </motion.h1>
            <div className="flex flex-col gap-px ml-1 flex-shrink-0">
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
            onClick={() => { setSearchOpen(!searchOpen); setFavOpen(false); }}
            className="p-2.5 rounded-full hover:bg-ink/6 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Search size={18} className="text-ink/60" />
          </button>

          <button
            onClick={onFeedbackOpen}
            className="p-2.5 rounded-full hover:bg-ink/6 transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <MessageSquare size={18} className="text-ink/60" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#FECB00] rounded-full" />
          </button>

          <button
            onClick={() => { setFavOpen(!favOpen); setSearchOpen(false); }}
            className="relative p-2.5 rounded-full hover:bg-[#FECB00]/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Heart size={18} className={favOpen ? 'text-[#FECB00] fill-[#FECB00]' : 'text-ink/60'} />
            {favoritesCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 min-w-[16px] min-h-[16px] bg-[#FECB00] text-ink text-[9px] font-mono font-bold rounded-full flex items-center justify-center px-1"
              >
                {favoritesCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Drawers */}
      <AnimatePresence>
        {favOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#FECB00]/15 bg-[#FFF8F0]"
          >
            <div className="px-5 py-3 max-w-2xl mx-auto">
              {favItems.length > 0 ? (
                <div className="space-y-2">
                  {favItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <div>
                        <p className="font-serif text-sm font-semibold text-ink leading-tight">{item.name}</p>
                      </div>
                      <span className="font-mono text-[#FECB00] text-xs font-bold">{item.price} MMK</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-2 text-sm text-ink/30 font-mono">No favourites yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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