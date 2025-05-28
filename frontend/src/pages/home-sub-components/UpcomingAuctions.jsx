import React, { useEffect } from 'react';
import Card from '@/custom-components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RiAuctionFill, RiTimeLine, RiCalendarEventLine } from 'react-icons/ri';
import { getAllAuctionItems } from '@/store/slice/auctionSlice';
import { Link } from 'react-router-dom';

const UpcomingAuctions = () => {
  // In a real implementation, we'd use the Redux data
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAuctionItems())
  },[dispatch]);

  function mostExpensiveAuction (){
    let maxStartBid = 0;
    let prime;
    for(let i = 0; i < allAuctions?.length; i++){
      if(allAuctions[i]?.startingBid > maxStartBid) {
        maxStartBid = allAuctions[i]?.startingBid;
        prime = allAuctions[i];
      }
    }
    return prime;
  }

  let primeAuction = mostExpensiveAuction();


  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  

  
  
  // Function to calculate time remaining to auction
  const getTimeRemaining = (startTime) => {
    const now = new Date();
    const auctionTime = new Date(startTime);
    const timeLeft = auctionTime - now;
    
    if (timeLeft <= 0) return "Starting soon";
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    if (hours < 1) return "Less than an hour";
    return `${hours} hours`;
  };

  return (
    <section className="my-16 px-4 sm:px-6 max-w-6xl mx-auto md:w-full">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8">
        <a href="/auctions" className="text-[#D6482B] font-medium hover:underline flex items-center">
          View all
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
      {/* Featured Section */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Auction Feature Card */}
        
        <div className="lg:col-span-1 bg-gradient-to-br from-[#161613] to-[#272723] rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
          <div className="p-6 flex flex-col h-full">
            <div className="bg-[#D6482B] text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <RiAuctionFill className="text-xl" />
            </div>
            
            <div className="mt-auto">
              <h3 className="text-[#fdba88] text-xl font-medium mb-2">Today's Featured</h3>
              <h2 className="text-white text-3xl font-bold mb-4">{formattedDate}</h2>
              
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-center text-stone-300">
                  <RiCalendarEventLine className="mr-2" />
                  <span>4 auctions scheduled</span>
                </div>
                <div className="flex items-center text-stone-300">
                  <RiTimeLine className="mr-2" />
                  <span>Next auction in {getTimeRemaining(primeAuction?.startTime)}</span>
                </div>
              </div>
              
              <button className="mt-6 w-full py-3 bg-[#D6482B] text-white rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Set Reminders
              </button>
            </div>
          </div>
        </div>
        
        {/* Featured Item */}
        <div className="lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-md">
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 h-48 md:h-auto relative overflow-hidden">
              <img 
                src={primeAuction?.image.url} 
                alt="Featured auction" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
              />

              <div className="absolute top-0 left-0 bg-[#D6482B] text-white px-4 py-1">
                Featured
              </div>
            </div>
            
            <div className="md:w-1/2 p-6 flex flex-col">
              <div className="mb-2">
                <span className="text-sm text-[#D6482B] font-medium">Premium Collection</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{primeAuction?.title}</h3>
              <p className="text-stone-600 mb-4">{primeAuction?.description}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-stone-500">Starting bid</p>
                    <p className="text-xl font-bold text-gray-900">{primeAuction?.startingBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-500">Time left</p>
                    <p className="text-[#D6482B] font-medium">{getTimeRemaining(primeAuction?.startTime)}</p>
                  </div>
                </div>
                
                <Link to={`/auction/item/${primeAuction?._id}`} className="w-full py-3 px-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {allAuctions?.map((auction) => (
          <div 
            key={auction._id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 "
          >
            <Card
              title={auction.title}
              imgSrc={auction.image?.url}
              startTime={auction.startTime}
              endTime={auction.endTime}
              startingBid={auction.startingBid}
              id={auction._id} 
            />
          </div>
        ))}
      </div>
      
      {/* View More Button - Mobile Only */}
      <div className="mt-8 text-center lg:hidden">
        <Link to={'/auctions'} className="bg-white border border-[#D6482B] text-[#D6482B] px-6 py-2 rounded-md font-medium hover:bg-[#D6482B] hover:text-white transition-colors">
          View All Auctions
        </Link>
      </div>
    </section>
  );
};

export default UpcomingAuctions;