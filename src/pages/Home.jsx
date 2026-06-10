import { useState, useCallback } from 'react';
import Header from '../components/tea/Header';
import HeroSection from '../components/tea/HeroSection';
import CategoryNav from '../components/tea/CategoryNav';
import MenuSection from '../components/tea/MenuSection';
import FeedbackDrawer from '../components/tea/FeedbackDrawer';
import FeedbackFAB from '../components/tea/FeedbackFAB';
import BackToTop from '../components/tea/BackToTop';
import Footer from '../components/tea/Footer';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('teaFavorites') || '[]');
    } catch {
      return [];
    }
  });
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('teaFavorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query) {
      setActiveCategory('all');
    }
  }, []);

  return (
    <div className="min-h-screen bg-parchment text-ink vintage-filter paper-texture selection:bg-honey/30">
      
      <Header
        favoritesCount={favorites.length}
        favorites={favorites}
        onSearchChange={handleSearch}
        onFeedbackOpen={() => setFeedbackOpen(true)}
      />

      <HeroSection />

      {/* ✅ FIXED: Removed the fighting sticky parent div container.
        CategoryNav now directly follows Header and anchors cleanly on mobile 
        using the structural CSS variable layout pipeline we created.
      */}
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main>
        <MenuSection
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <Footer />

      <FeedbackFAB onClick={() => setFeedbackOpen(true)} />
      <BackToTop />

      <FeedbackDrawer
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </div>
  );
}