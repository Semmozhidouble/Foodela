import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative group max-w-xl mx-auto w-full z-20">
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl px-6 py-4 shadow-glass transition-all focus-within:ring-2 ring-primary/20 focus-within:bg-white/90">
        <Search className="text-slate-400 mr-4" size={22} />
        <input
          type="text"
          placeholder="Search for restaurants, cuisines..."
          className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400 text-lg font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;