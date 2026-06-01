import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function MenuItem({ item, isFavorite, onToggleFavorite, index }) {
  const hasAltPrices = item.priceAlt || item.priceAlt2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="group flex items-start justify-between gap-3 py-3.5 border-b border-ink/6 last:border-b-0"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-base text-ink font-semibold leading-tight">
            {item.name}
          </h3>
        </div>
        {item.nameEN && (
          <p className="text-ink/35 text-[11px] font-mono mt-0.5 tracking-wide">{item.nameEN}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-1.5 items-center">
          <span className="font-mono text-honey font-bold text-sm">{item.price}</span>
          {item.priceAlt && (
            <span className="font-mono text-ink/40 text-xs">{item.priceAlt}</span>
          )}
          {item.priceAlt2 && (
            <span className="font-mono text-jade/70 text-xs">{item.priceAlt2}</span>
          )}
          {!hasAltPrices && item.price && (
            <span className="text-ink/20 text-[10px] font-mono">MMK</span>
          )}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.75 }}
        onClick={() => onToggleFavorite(item.id)}
        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-honey/10 transition-colors flex-shrink-0 mt-0.5"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={16}
          className={`transition-all duration-200 ${
            isFavorite ? 'text-honey fill-honey scale-110' : 'text-ink/20 group-hover:text-ink/40'
          }`}
        />
      </motion.button>
    </motion.div>
  );
}