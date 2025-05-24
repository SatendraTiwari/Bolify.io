import { getAuctionDetail } from '@/store/slice/auctionSlice';
import React, { useEffect, useState } from 'react';
import { 
  FaChevronRight, 
  FaClock, 
  FaGavel, 
  FaUser, 
  FaCalendarAlt,
  FaInfoCircle,
  FaUserClock
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { auctionData } from '../../data';

// Sample bidders data (in real app, this would come from API)
// const auctionBidders = [
//   {
//     _id: 1,
//     username: "jonny",
//     moneySpant: 15600,
//     auctionWin: 2,
//     profileImage: { url: 'https://picsum.photos/200/600' },
//   },
//   {
//     _id: 2,
//     username: "alibi",
//     moneySpant: 15500,
//     auctionWin: 2,
//     profileImage: { url: 'https://picsum.photos/200/700' },
//   },
//   {
//     _id: 3,
//     username: "mark",
//     moneySpant: 15000,
//     auctionWin: 2,
//     profileImage: { url: 'https://picsum.photos/200/800' },
//   },
//   {
//     _id: 4,
//     username: "anaya",
//     moneySpant: 15000,
//     auctionWin: 2,
//     profileImage: { url: 'https://picsum.photos/200/900' },
//   },
// ];

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail,auctionBidders,allAuctions } = useSelector((state) => state.auction);
  console.log(auctionDetail);
  const { isAuthenticated, user } = useSelector((state) => state.user);


  // Get related items from auction data, excluding current auction
  const relatedItems = allAuctions.filter(auction => auction._id != id).slice(0, 4);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  // Check authentication and redirect if needed

  useEffect(() => {
    if(!isAuthenticated || user?.role !== "Auctioneer"){
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch auction details
  useEffect(() => {
    dispatch(getAuctionDetail(id));
  }, [id, dispatch]);

  // Calculate time remaining
  useEffect(() => {
    if (auctionDetail && auctionDetail.endTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const end = new Date(auctionDetail.endTime);

        if (now >= end) {
          setTimeLeft('Auction ended');
          clearInterval(interval);
        } else {
          const diff = end - now;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auctionDetail]);


  useEffect(() => {
    if (auctionDetail && auctionDetail.startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const start = new Date(auctionDetail.startTime);

        if (now >= start) {
          setTimeStart('Auction started');
          clearInterval(interval);
        } else {
          const diff = start - now;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeStart(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auctionDetail]);

  // Handle bid submission
  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log(`Bid submitted: $${bidAmount}`);
    setIsBidModalOpen(false);
  };

  // Check if auction is active
  const isAuctionActive = auctionDetail && new Date(auctionDetail.endTime) > Date.now();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const now = new Date();
  const auctionStartTime = new Date(auctionDetail.startTime);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d6482b]"></div>
      </div>
    );
  }

  // If auction detail doesn't exist yet, show pending state
  if (!auctionDetail) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 lg:pl-[300px]">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <div className="animate-pulse mb-4">
            <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 mx-auto mt-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 mx-auto mt-2 bg-gray-200 rounded"></div>
          </div>
          <p className="text-gray-600">Loading auction details...</p>
        </div>
      </div>
    );
  }

  // Calculate minimum bid
  const currentHighestBid = auctionBidders && auctionBidders.length > 0 
    ? auctionBidders[0].moneySpant 
    : auctionDetail.startingBid || 0;
  
  const minimumBid = currentHighestBid + 1;

  return (
    <div className="bg-gray-100 min-h-screen pb-12 lg:pl-[300px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-[#d6482b] transition-colors whitespace-nowrap">
            Home
          </Link>
          <FaChevronRight className="mx-2 text-gray-400 text-xs flex-shrink-0" />
          <Link to="/view-my-auctions" className="hover:text-[#d6482b] transition-colors whitespace-nowrap">
            My Auctions
          </Link>
          <FaChevronRight className="mx-2 text-gray-400 text-xs flex-shrink-0" />
          <span className="text-gray-700 truncate">
            {auctionDetail?.title || 'Auction Item'}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative bg-gray-50 h-80 md:h-96 flex justify-center items-center">
                <img
                  src={auctionDetail.image?.url || '/public/logo.svg'}
                  alt={auctionDetail.title || 'Auction Item'}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {auctionDetail?.title || 'Auction Item'}
                  </h1>
                  
                  <div className={`py-1 px-3 rounded-full text-sm font-medium ${
                    
                    isAuctionActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isAuctionActive ? "Active" : "Ended"}
                  </div>
                </div>

                {/* Auction Timer */}
                <div className="items-center mt-3 text-sm grid grid-cols-1">
                  { 
                    now <= auctionStartTime ?(
                      <div className="flex items-center text-gray-500">
                    <FaClock className="mr-2 text-[#d6482b]" />
                    <span>
                      {isAuctionActive 
                        ? `Start in: ${timeStart}` 
                        : 'Auction has Start'
                      }
                    </span>
                  </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                    <FaClock className="mr-2 text-[#d6482b]" />
                    <span>
                      {isAuctionActive 
                        ? `Start in: ${timeStart}` 
                        : 'Auction has Start'
                      }
                    </span>
                  </div>
                    )
                  }

            
                  <div className="flex items-center text-gray-500">
                    <FaClock className="mr-2 text-[#d6482b]" />
                    <span>
                      {isAuctionActive 
                        ? `Ends in: ${timeLeft}` 
                        : 'Auction has ended'
                      }
                    </span>
                  </div>
                </div>
                
                {/* Price */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <p className="text-sm text-gray-500">Starting Bid</p>
                      <p className="text-2xl font-bold text-[#d6482b]">
                      &#8377; {auctionDetail.startingBid || '0'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="text-2xl font-bold text-green-600">
                      &#8377; {auctionBidders && auctionBidders.length > 0 
                          ? auctionBidders[0].amount
                          : auctionDetail.startingBid || '0'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Auction Info */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {formatDate(auctionDetail.startTime)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mr-3 flex-shrink-0">
                      <FaUserClock />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">
                        {formatDate(auctionDetail.endTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="border-t border-gray-100">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Description</h2>
                  
                  {auctionDetail.description ? (
                    <div className="space-y-2">
                      {auctionDetail.description.split(", ").map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1 mr-3 flex-shrink-0 rounded-full bg-[#d6482b]/10 p-1">
                            <div className="h-2 w-2 rounded-full bg-[#d6482b]"></div>
                          </div>
                          <p className="text-gray-600">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No description provided.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bidding Area */}
          <div className="space-y-6">
            {/* Bidders List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Current Bidders</h2>
              </div>

              {auctionBidders && auctionBidders.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {auctionBidders.map((bidder, index) => (
                    <div 
                      key={bidder._id} 
                      className={`p-4 flex items-center justify-between ${
                        index === 0 ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={bidder.profileImage}
                            alt={bidder.username}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-sm">
                              1
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">{bidder.username}</p>
                          <p className="text-xs text-gray-500">{bidder.auctionWin} auctions won</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-bold ${
                          index === 0 ? 'text-green-600' : 
                          index === 1 ? 'text-blue-600' : 
                          index === 2 ? 'text-amber-600' : 'text-gray-600'
                        }`}>
                          ${bidder.amount}
                        </p>
                        <p className="text-xs text-gray-500">
                          {index === 0 ? 'Highest Bid' : `Bid #${index + 1}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                    <FaUser className="text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No Bidders Yet</h3>
                  <p className="text-gray-500 text-sm">
                    Be the first to place a bid on this auction!
                  </p>
                </div>
              )}
            </div>

            {/* Related Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Related Auctions</h2>
              </div>

              <div className="p-4">
                {relatedItems.length > 0 ? (
                  <div className="space-y-4">
                    {relatedItems.slice(0, 3).map(item => (
                      <Link 
                        key={item._id} 
                        to={`/view/details/${item._id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.imgSrc?.url || '/public/logo.svg'} 
                            alt={item.title} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">{item.title}</h3>
                          <p className="text-sm text-[#d6482b] font-semibold">${item.startingBid?.toLocaleString()}</p>
                        </div>
                        <div className={`py-1 px-2 rounded-full text-xs font-medium flex-shrink-0 ${
                          new Date(item.endTime) > Date.now() 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {new Date(item.endTime) > Date.now() ? 'Active' : 'Ended'}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-gray-500">
                    No related auctions found
                  </div>
                )}
                
                {relatedItems.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link 
                      to="/view-my-auctions" 
                      className="text-[#d6482b] hover:text-[#c23a1f] font-medium text-sm inline-flex items-center"
                    >
                      View All
                      <FaChevronRight className="ml-1 text-xs" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Auction Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Auction Information</h2>
              </div>
              
              <div className="p-4">
                <div className="flex items-start mb-4">
                  <FaInfoCircle className="text-[#d6482b] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">Bidding Rules</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Bids are final and cannot be withdrawn. The highest bid at the end of the auction wins.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaGavel className="text-[#d6482b] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-800">After Winning</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Winners will be notified by email with payment instructions and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bid Modal */}
      {isBidModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
            
            <div className="relative z-10 inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Place Your Bid</h3>
                <button 
                  onClick={() => setIsBidModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleBidSubmit}>
                <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Bid Amount (&#8377;100)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="bidAmount"
                      id="bidAmount"
                      className="focus:ring-[#d6482b] focus:border-[#d6482b] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      min={minimumBid}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">INR</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Minimum bid: ${minimumBid.toLocaleString()}
                  </p>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d6482b] hover:bg-[#c23a1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6482b]"
                  >
                    Submit Bid
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAuctionDetails;