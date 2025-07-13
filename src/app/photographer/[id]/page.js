'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, ChevronLeft } from 'lucide-react';
import ImageCarousel from '../../../components/ImageCarousel';
import ReviewCard from '../../../components/ReviewCard';
import InquiryModal from '../../../components/InquiryModal';
import { useApp } from '../../../context/AppContext';

export default function PhotographerProfile() {
  const params = useParams();
  const router = useRouter();
  const { getPhotographerById } = useApp();
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    fetchPhotographer();
  }, [params.id]);

  const fetchPhotographer = async () => {
    try {
      setLoading(true);
      const photographerData = getPhotographerById(params.id);
      setPhotographer(photographerData);
    } catch (error) {
      console.error('Error fetching photographer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500">Photographer not found</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back to listings
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to listings
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <ImageCarousel images={photographer.portfolio} />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-medium">{photographer.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{photographer.location}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{photographer.bio}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Photography Styles</h3>
            <div className="flex flex-wrap gap-2">
              {photographer.styles.map((style, index) => (
                <span
                  key={index}
                  className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {photographer.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-2xl font-bold">₹{photographer.price.toLocaleString()}</p>
            </div>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="btn-primary"
            >
              Send Inquiry
            </button>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {photographer.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        photographerName={photographer.name}
      />
    </div>
  );
}
