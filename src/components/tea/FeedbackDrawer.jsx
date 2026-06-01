import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, CheckCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const emojis = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😞', label: 'Sad' },
];

export default function FeedbackDrawer({ open, onOpenChange }) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0 && !selectedEmoji && !comment) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setSelectedEmoji(null);
      setComment('');
      onOpenChange(false);
    }, 2000);
  };

  const reset = () => {
    setSubmitted(false);
    setRating(0);
    setSelectedEmoji(null);
    setComment('');
  };

  return (
    <Sheet open={open} onOpenChange={(val) => { onOpenChange(val); if (!val) reset(); }}>
      <SheetContent side="bottom" className="bg-parchment border-t border-ink/10 rounded-t-2xl max-h-[85vh]">
        <SheetHeader className="pb-4">
          <SheetTitle className="font-serif text-xl text-ink">Share Your Experience</SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
              >
                <CheckCircle size={48} className="text-jade" />
              </motion.div>
              <p className="font-serif text-xl text-ink mt-4">Thank you!</p>
              <p className="text-ink/50 text-sm mt-1">Your feedback helps us brew better.</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div>
                <label className="text-sm font-mono text-ink/40 uppercase tracking-wider mb-3 block">
                  Rate your visit
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileTap={{ scale: 0.8 }}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(star)}
                      className="p-1"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        size={28}
                        className={`transition-all ${
                          star <= (hoveredStar || rating)
                            ? 'text-honey fill-honey'
                            : 'text-ink/15'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Emoji Reactions */}
              <div>
                <label className="text-sm font-mono text-ink/40 uppercase tracking-wider mb-3 block">
                  How do you feel?
                </label>
                <div className="flex gap-3">
                  {emojis.map((e) => (
                    <motion.button
                      key={e.label}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => setSelectedEmoji(e.label)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                        selectedEmoji === e.label
                          ? 'border-honey/40 bg-honey/10'
                          : 'border-ink/5 hover:border-ink/15'
                      }`}
                    >
                      <span className="text-2xl">{e.emoji}</span>
                      <span className="text-[10px] font-mono text-ink/40">{e.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Comment Box */}
              <div>
                <label className="text-sm font-mono text-ink/40 uppercase tracking-wider mb-3 block">
                  Leave a note
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you love? Any suggestions?"
                  rows={3}
                  className="w-full bg-ink/5 rounded-lg px-4 py-3 text-sm font-sans text-ink placeholder:text-ink/25 focus:outline-none focus:ring-1 focus:ring-honey/30 resize-none transition-all"
                />
              </div>

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={rating === 0 && !selectedEmoji && !comment}
                className="w-full bg-ink text-parchment py-3.5 rounded-lg font-sans font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-30 transition-opacity"
              >
                <Send size={16} />
                Send Feedback
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}