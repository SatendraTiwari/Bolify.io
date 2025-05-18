import React, { useEffect, useState } from 'react';
import { Clock, Tag, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Card({ imgSrc, title, startingBid, currentBid, startTime, endTime, id, bidCount = 0, onClick ,className,titleStyle}) {
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
          <span className="text-lg font-bold">{days}d {pad(hours)}h</span>
          <span className="text-xs text-gray-500">{pad(minutes)}m {pad(seconds)}s</span>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col">
        <span className="text-lg font-bold">{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
      </div>
    );
  };

  const getStatusColor = () => {
    if (timeLeft.type === "Starts In") return "bg-blue-50 text-blue-700";
    if (timeLeft.type === "Ends In") return "bg-amber-50 text-amber-700";
    return "bg-gray-50 text-gray-700";
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(id);
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group cursor-pointer"
    >
      <div className={`flex flex-col md:w-full md:h-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:border-orange-200 ${className}`}>
        <div className="relative overflow-hidden">
          <div className="absolute top-2 left-2 z-10">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
              {timeLeft.type}
            </span>
          </div>
          <img 
            src={imgSrc} 
            alt={title} 
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <h3 className={`mb-2 text-lg font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 ${titleStyle} `}>
            {title}
          </h3>
          
          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 text-sm md:text-lg">
                <Tag size={16} className="mr-1" />
                <span>Starting Bid</span>
              </div>
              <span className="font-bold text-amber-600">{startingBid}</span>
            </div>
            
            {currentBid && (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Award size={16} className="mr-1" />
                  <span>Current Bid</span>
                </div>
                <span className="font-bold text-green-600">{currentBid}</span>
              </div>
            )}
            
            <div className="pt-3 mt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
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
              
              {bidCount > 0 && (
                <div className="mt-2 text-sm text-gray-500 text-right">
                  {bidCount} bid{bidCount !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}