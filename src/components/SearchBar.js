'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useApp } from '../context/AppContext';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { updateFilters } = useApp();

  useEffect(() => {
    updateFilters({ searchQuery: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search by name, location, or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
