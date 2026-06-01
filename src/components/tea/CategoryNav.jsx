import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import menuData from '../../data/menu.json';

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const activeEl = scrollRef.current?.querySelector(`[data-cat="${activeCategory}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-[65px] z-40 bg-parchment/92 backdrop-blur-md border-b border-ink/5">
      <div
        ref={scrollRef}
        className="flex gap-1 px-5 py-2.5 max-w-2xl mx-auto overflow-x-auto no-scrollbar"
      >
        <button
          data-cat="all"
          onClick={() => onCategoryChange('all')}
          className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all min-h-[36px] ${
            activeCategory === 'all' ? 'text-steam' : 'text-ink/40 hover:text-ink/70'
          }`}
        >
          {activeCategory === 'all' && (
            <motion.span
              layoutId="catPill"
              className="absolute inset-0 bg-ink rounded-full"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <span className="relative z-10">All</span>
        </button>

        {menuData.categories.map((cat) => (
          <button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`relative whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all min-h-[36px] ${
              activeCategory === cat.id ? 'text-steam' : 'text-ink/40 hover:text-ink/70'
            }`}
          >
            {activeCategory === cat.id && (
              <motion.span
                layoutId="catPill"
                className="absolute inset-0 bg-ink rounded-full"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{cat.icon}</span>
              <span>{cat.labelMM}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}