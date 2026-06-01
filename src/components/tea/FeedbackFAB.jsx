import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function FeedbackFAB({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-5 bg-ink text-parchment px-5 py-3.5 rounded-full shadow-2xl z-50 flex items-center gap-2.5 group"
      aria-label="Give feedback"
    >
      <Star size={16} className="text-honey fill-honey group-hover:rotate-12 transition-transform" />
      <span className="text-sm font-mono uppercase tracking-tight">Feedback</span>
    </motion.button>
  );
}