import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div className="relative flex items-center gap-2">
      <Search size={16} className="text-ink/30 absolute left-3" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tea, coffee, snacks..."
        className="w-full bg-ink/5 rounded-lg pl-10 pr-10 py-2.5 text-sm font-sans text-ink placeholder:text-ink/30 focus:outline-none focus:ring-1 focus:ring-honey/30 transition-all"
      />
      {query && (
        <button
          onClick={() => { setQuery(''); onClose(); }}
          className="absolute right-3 p-0.5"
          aria-label="Clear search"
        >
          <X size={14} className="text-ink/40" />
        </button>
      )}
    </div>
  );
}