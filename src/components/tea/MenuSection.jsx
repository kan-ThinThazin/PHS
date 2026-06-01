import MenuItem from './MenuItem';
import menuData from '../../data/menu.json';

export default function MenuSection({ activeCategory, searchQuery, favorites, onToggleFavorite }) {
  const allItems = Object.entries(menuData.items).flatMap(([catId, items]) =>
    items.map((item) => ({ ...item, categoryId: catId }))
  );

  const filteredItems =
    searchQuery
      ? allItems.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.nameEN && item.nameEN.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : activeCategory === 'all'
      ? allItems
      : allItems.filter((item) => item.categoryId === activeCategory);

  if (searchQuery) {
    return (
      <div className="px-5 py-6 max-w-2xl mx-auto">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-lg text-ink/30">No items found</p>
            <p className="text-sm text-ink/20 mt-1">Try a different keyword</p>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-mono text-ink/30 uppercase tracking-widest mb-4">
              {filteredItems.length} results
            </p>
            {filteredItems.map((item, idx) => (
              <MenuItem
                key={item.id}
                item={item}
                index={idx}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </>
        )}
      </div>
    );
  }

  if (activeCategory !== 'all') {
    const cat = menuData.categories.find((c) => c.id === activeCategory);
    return (
      <div className="px-5 py-6 max-w-2xl mx-auto">
        {filteredItems.map((item, idx) => (
          <MenuItem
            key={item.id}
            item={item}
            index={idx}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    );
  }

  // All categories grouped
  return (
    <div className="px-5 py-6 max-w-2xl mx-auto">
      {menuData.categories.map((cat) => {
        const catItems = menuData.items[cat.id] || [];
        if (catItems.length === 0) return null;
        return (
          <div key={cat.id} className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <div>
                <h2 className="font-serif text-lg font-bold text-ink leading-tight">
                  {cat.labelMM}
                </h2>
                <p className="text-[10px] font-mono text-ink/30 uppercase tracking-wider">{cat.label}</p>
              </div>
              <div className="flex-1 h-px bg-ink/6" />
              <span className="font-mono text-[10px] text-ink/20">{catItems.length}</span>
            </div>
            {catItems.map((item, idx) => (
              <MenuItem
                key={item.id}
                item={item}
                index={idx}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}