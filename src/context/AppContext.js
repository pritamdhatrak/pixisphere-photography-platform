'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { photographersData } from '../data/photographers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    minRating: 0,
    styles: [],
    city: '',
    searchQuery: '',
    sortBy: 'rating-desc'
  });

  // Load photographers when app starts
  useEffect(() => {
    fetchPhotographers();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [filters, photographers]);

  const fetchPhotographers = async () => {
    try {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Use static data instead of API call
      setPhotographers(photographersData);
      setFilteredPhotographers(photographersData);
    } catch (error) {
      console.error('Error loading photographers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Find photographer by ID (for profile page)
  const getPhotographerById = (id) => {
    return photographersData.find(p => p.id === parseInt(id));
  };

  const applyFilters = () => {
    let filtered = [...photographers];

    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by minimum rating
    if (filters.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.minRating);
    }

    // Filter by photography styles
    if (filters.styles.length > 0) {
      filtered = filtered.filter(p =>
        filters.styles.some(style => p.styles.includes(style))
      );
    }

    // Filter by city/location
    if (filters.city) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Search functionality - check name, location, and tags
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort the results
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredPhotographers(filtered);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <AppContext.Provider
      value={{
        photographers,
        filteredPhotographers,
        loading,
        filters,
        updateFilters,
        fetchPhotographers,
        getPhotographerById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
