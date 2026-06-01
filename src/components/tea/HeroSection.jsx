import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menuData from '../../data/menu.json';

export default function HeroSection() {
  const slides = menuData.featured;
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className="px-5 pt-6 pb-2 max-w-2xl mx-auto">
      <div className="relative h-60 sm:h-76 rounded-sm overflow-hidden">
        {/* Background Image Crossfade */}
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.id + '-bg'}
            src={slide.image}
            alt={slide.nameEN}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />

        {/* Live steam particles */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full bg-steam/25"
              style={{ height: `${18 + i * 4}px` }}
              animate={{ y: [-4, -22], opacity: [0, 0.5, 0], scaleX: [1, 1.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Shimmer bar */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundPosition: ['200% center', '-200% center'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
            backgroundSize: '300% 100%',
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="inline-block text-steam/60 font-mono text-[10px] uppercase tracking-[0.25em] mb-1.5">
                ✦ Today's Special
              </span>
              <h2 className="text-steam text-2xl sm:text-3xl font-serif font-bold leading-tight">
                {slide.name}
              </h2>
              <p className="text-steam/50 text-[13px] mt-1 font-mono tracking-wide">
                {slide.nameEN}
              </p>
              <p className="text-steam/60 text-sm mt-1 max-w-sm font-sans leading-snug">
                {slide.description}
              </p>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mt-2 font-mono text-honey font-bold text-sm"
              >
                {slide.price} MMK
              </motion.span>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setIsVisible(true); }}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === current ? '24px' : '6px',
                  background: i === current ? '#B37227' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}