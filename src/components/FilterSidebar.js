'use client';

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterSidebar() {
  const { filters, updateFilters } = useApp();
  const [isOpen, setIsOpen] = useState(true);

  const styles = ['Traditional', 'Candid', 'Studio', 'Outdoor', 'Indoor'];
  const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai'];

  const handleStyleChange = (style) => {
    const newStyles = filters.styles.includes(style)
      ? filters.styles.filter(s => s !== style)
      : [...filters.styles, style];
    updateFilters({ styles: newStyles });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="50000"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilters({ priceRange: [0, parseInt(e.target.value)] })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹0</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Minimum Rating</h4>
          <select
            value={filters.minRating}
            onChange={(e) => updateFilters({ minRating: parseFloat(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="0">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <div>
          <h4 className="font-medium mb-2">Photography Style</h4>
          <div className="space-y-2">
            {styles.map(style => (
              <label key={style} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.styles.includes(style)}
                  onChange={() => handleStyleChange(style)}
                  className="mr-2"
                />
                <span className="text-sm">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">City</h4>
          <select
            value={filters.city}
            onChange={(e) => updateFilters({ city: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <h4 className="font-medium mb-2">Sort By</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="rating-desc">Rating: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>
    </div>
  );
}
