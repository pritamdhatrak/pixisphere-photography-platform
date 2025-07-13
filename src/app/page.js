'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import PhotographerCard from '../components/PhotographerCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const { filteredPhotographers, loading } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate pagination stuff
  const totalPages = Math.ceil(filteredPhotographers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPhotographers = filteredPhotographers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPhotographers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Find Your Perfect Photographer
      </h1>

      <SearchBar />

      {/* Fun suggestion banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-8">
        <p className="text-sm">
          <span className="font-semibold">💡 Pro Tip:</span> Check out our top-rated photographers in your city!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter sidebar */}
        <aside className="lg:w-1/4">
          <FilterSidebar />
        </aside>

        {/* Main content area */}
        <main className="lg:w-3/4">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {paginatedPhotographers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Oops! No photographers found. Try adjusting your filters.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPhotographers.map(photographer => (
                      <PhotographerCard key={photographer.id} photographer={photographer} />
                    ))}
                  </div>

                  {/* Simple pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
