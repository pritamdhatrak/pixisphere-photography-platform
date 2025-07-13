'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

export default function PhotographerCard({ photographer }) {
  return (
    <div className="card p-4 hover:scale-[1.02] transition-transform">
      <div className="relative h-48 mb-4">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <h3 className="font-semibold text-lg mb-2">{photographer.name}</h3>
      
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{photographer.location}</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{photographer.rating}</span>
        </div>
        <span className="text-lg font-semibold">₹{photographer.price.toLocaleString()}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {photographer.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link
        href={`/photographer/${photographer.id}`}
        className="btn-primary w-full text-center block"
      >
        View Profile
      </Link>
    </div>
  );
}
