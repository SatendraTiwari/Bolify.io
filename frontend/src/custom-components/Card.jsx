import React, { useEffect, useState } from 'react';
import { Clock, Tag, Award, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Card({ 
  imgSrc, 
  title, 
  startingBid, 
  currentBid, 
  startTime, 
  endTime, 
  id, 
  bidCount = 0, 
  onClick,
  className = "",
  titleStyle = "",
  isFavorite = false,
  category = ""
}) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60)
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60)
      };
    } else {
      timeLeft = {
        type: "Auction Ended",
        ended: true
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    
    if (days > 0) {
      return (
        <div className="flex flex-col">
          <span className="text-sm md:text-lg font-bold">{days}d {pad(hours)}h</span>
          <span className="text-xs text-gray-500">{pad(minutes)}m {pad(seconds)}s</span>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col">
        <span className="text-sm md:text-lg font-bold">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
      </div>
    );
  };

  const getStatusColor = () => {
    if (timeLeft.type === "Starts In") return "bg-blue-100 text-blue-700";
    if (timeLeft.type === "Ends In") return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(id);
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex flex-col w-full h-full overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl ${isHovered ? 'border-orange-300' : ''} ${className}`}>
        <div className="relative overflow-hidden">
          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${getStatusColor()}`}>
              {timeLeft.type}
            </span>
          </div>
          
          {/* Category Tag */}
          {category && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/80 text-gray-700 shadow-sm">
                {category}
              </span>
            </div>
          )}
          
          {/* Favorite Button */}
          <div className="absolute bottom-3 right-3 z-10">
            <button 
              className={`p-2 rounded-full shadow-md transition-all ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-500 hover:bg-red-50 hover:text-red-500'
              }`}
              onClick={(e) => {
                e.preventDefault();
                // Add favorite toggle handler here
              }}
            >
              <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
          
          {/* Image */}
          <div className="w-full aspect-[4/3] overflow-hidden">
            <img 
              src={imgSrc} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
        </div>
        
        <div className="flex flex-col flex-grow p-4 md:p-5">
          {/* Title */}
          <h3 className={`mb-3 text-base md:text-lg font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 transition-colors duration-300 ${titleStyle}`}>
            {title}
          </h3>
          
          <div className="mt-auto space-y-3">
            {/* Bidding Information */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 text-xs md:text-sm">
                  <Tag size={14} className="mr-1 md:mr-2" />
                  <span>Starting Bid</span>
                </div>
                <span className="font-bold text-amber-600 text-sm md:text-base">{startingBid}</span>
              </div>
              
              {currentBid && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 text-xs md:text-sm">
                    <Award size={14} className="mr-1 md:mr-2" />
                    <span>Current Bid</span>
                  </div>
                  <span className="font-bold text-green-600 text-sm md:text-base">{currentBid}</span>
                </div>
              )}
            </div>
            
            {/* Timer and Bids Section */}
            <div className="pt-3 mt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 text-xs md:text-sm">
                  <Clock size={14} className="mr-1 md:mr-2" />
                  {timeLeft.ended ? 
                    <span className="text-gray-500">Auction ended</span> : 
                    <span>{timeLeft.type}</span>
                  }
                </div>
                
                {!timeLeft.ended && Object.keys(timeLeft).length > 1 && (
                  <div className="text-right">
                    {formatTimeLeft(timeLeft)}
                  </div>
                )}
              </div>
              
              {/* Bid Count */}
              {bidCount > 0 && (
                <div className="mt-2 flex items-center justify-end text-xs md:text-sm text-gray-500">
                  <Users size={14} className="mr-1" />
                  <span>{bidCount} bid{bidCount !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}