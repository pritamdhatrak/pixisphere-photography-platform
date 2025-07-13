import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{review.name}</h4>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      <div className="flex items-center mb-2">
        {renderStars(review.rating)}
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}
