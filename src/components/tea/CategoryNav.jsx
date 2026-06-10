import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import menuData from '../../data/menu.json';

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const scrollRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-cat="${activeCategory}"]`);
    if (el && scrollRef.current) {
      const c = scrollRef.current;
      c.scrollTo({ 
        left: el.offsetLeft - c.offsetWidth / 2 + el.offsetWidth / 2, 
        behavior: 'smooth' 
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = (catId) => {
    onCategoryChange(catId);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`sticky z-40 w-full transition-all duration-300 ${
        isSticky
          ? 'bg-white/97 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-b border-ink/5'
          : 'bg-parchment/90 backdrop-blur-sm border-b border-ink/5'
      }`}
      style={{
        position: '-webkit-sticky',
        position: 'sticky',
        // Reads the exact runtime height of your header file to avoid alignment gaps
        top: 'var(--header-height, 73px)',
      }}
    >
      {/* layoutRoot isolates Framer Motion positioning tracking on mobile viewport updates */}
      <motion.div
        layoutRoot
        ref={scrollRef}
        className="flex gap-1 px-5 py-2.5 max-w-2xl mx-auto overflow-x-auto no-scrollbar subpixel-antialiased touch-pan-x relative"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* "All" Button */}
        <button
          data-cat="all"
          onClick={() => handleCategoryClick('all')}
          className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all min-h-[36px] ${
            activeCategory === 'all' 
              ? 'text-white' 
              : isSticky ? 'text-ink/50 hover:text-ink/80' : 'text-ink/40 hover:text-ink/70'
          }`}
        >
          {activeCategory === 'all' && (
            <motion.span
              layoutId="catPill"
              className={`absolute inset-0 rounded-full ${isSticky ? 'bg-[#847f7f]' : 'bg-ink'}`}
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <span className="relative z-10">All</span>
        </button>

        {/* Dynamic Category Buttons */}
        {menuData.categories.map((cat) => (
          <button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all min-h-[36px] ${
              activeCategory === cat.id 
                ? 'text-white' 
                : isSticky ? 'text-ink/50 hover:text-ink/80' : 'text-ink/40 hover:text-ink/70'
            }`}
          >
            {activeCategory === cat.id && (
              <motion.span
                layoutId="catPill"
                className={`absolute inset-0 rounded-full ${isSticky ? 'bg-[#a61e2d]' : 'bg-ink'}`}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{cat.icon}</span>
              <span>{cat.labelMM}</span>
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}