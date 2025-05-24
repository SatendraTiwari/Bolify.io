import { getAuctionDetail } from '@/store/slice/auctionSlice';
import { setShowLogin } from '@/store/slice/loginShow';
import React, { useEffect, useState } from 'react';
import { FaGreaterThan, FaClock, FaGavel, FaUser, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { auctionData } from '../../data';
import { placeBid } from '@/store/slice/bidSlice';

// const auctionBidderss = [
//   {
//     _id: 1,
//     username: "jonny",
//     moneySpant: 15000,
//     auctionWin: 2,
//     profileImage: { url: 'https://picsum.photos/200/600' },
//   },
//   {
//     _id: 2,
//     username: "alibi",
//     moneySpant: 15000,
//     auctionWin: 2,
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

const AuctionItem = () => {
  const { id } = useParams();

  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const {message,} = useSelector((state) => state.bid);

  //auction detail are object so convert to array and find the auction by id

  const auctionDetails = Array.isArray(auctionDetail)
    ? auctionDetail.find(auction => String(auction._id) === String(id))
    : auctionDetail && String(auctionDetail._id) === String(id)
      ? auctionDetail
      : null;


  const { isAuthenticated,user } = useSelector((state) => state.user);

  const { loginShow } = useSelector((state) => state.logShow);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [bidPlaced, setBidPlaced] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  // relatedItems should come from allAuctions or another source, here we use empty array as placeholder
  const relatedItems = [];

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/');
      dispatch(setShowLogin({loginShow : !loginShow}));
    }
    if(id) {
      dispatch(getAuctionDetail(id));
    }
  }, [dispatch,id]);

  useEffect(() => {
    if (auctionDetails) {
      const interval = setInterval(() => {
        const now = new Date();
        const end = new Date(auctionDetails.endTime);
        
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
  },[auctionDetails]);



  const handleBidSubmit = async(e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(setShowLogin({ loginShow: !loginShow }));
      return;
    }

    if (amount && Number(amount) >= auctionDetails.startingBid) {
      // Implement bid logic here;
      const formData = new FormData();
      formData.append("amount", amount);
      dispatch(placeBid(id,formData));
      setBidPlaced(true);
      setTimeout(() => setBidPlaced(false), 3000);
    }
  };



  const ScrollHandler = () => window.scrollTo({ top: 0, behavior: 'smooth' })



  const nextSlide = () => {
    if (currentSlide >= Math.ceil(relatedItems.length / 3) - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(Math.ceil(relatedItems.length / 3) - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d6482b]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen section">
      <div className="container mx-auto px-4 py-3">
        {/* Breadcrumb */}
        <div className="text-sm md:text-base flex flex-wrap gap-2 items-center mb-6">
          <Link to={'/'} className="font-medium text-gray-600 hover:text-[#d6482b] transition-all">
            Home
          </Link>
          <FaGreaterThan className="text-gray-400 text-xs" />
          <Link to={'/auctions'} className="font-medium text-gray-600 hover:text-[#d6482b] transition-all">
            Auction
          </Link>
          <FaGreaterThan className="text-gray-400 text-xs" />
          <p className="text-gray-500 truncate max-w-xs">
            {auctionDetail?.title || 'Auction Item'}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Item Details */}
          <div className="lg:col-span-3">
            {/* Image and Details Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Image */}
              <div className="bg-white h-80 md:h-96 flex justify-center items-center p-4 border-b">
                <img 
                  src={auctionDetails?.image?.url || '/public/logo.svg'} 
                  alt={auctionDetails?.title || 'Auction Item'} 
                  className="h-full w-auto object-contain"
                />
              </div>
              
              {/* Details */}
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {auctionDetails?.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#d6482b]/10 text-[#d6482b] font-semibold rounded-full px-4 py-1 text-sm">
                    {new Date(auctionDetails?.endTime) > Date.now() ? 'Active' : 'Ended'}
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <FaClock className="mr-1" />
                    <span>{timeLeft}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Starting Bid</p>
                  <p className="text-2xl font-bold text-[#d6482b]">
                    ${auctionDetails?.startingBid?.toLocaleString()}
                  </p>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <ul className="space-y-2">
                    {auctionDetails?.description && 
                      auctionDetails.description.split(", ").map((element, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-5 w-5 rounded-full bg-[#d6482b]/10 text-[#d6482b] flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                          <span className="text-gray-600">{element}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bidding Area */}
          <div className="lg:col-span-2">
            {/* Bid Form */}
           {(user.role == "Bidder" || (user.role === "Auctioneer" && user._id !== auctionDetail.createdBy)) && <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-[#d6482b] to-[#e96b4f] py-4 px-6">
                <h2 className="text-white text-xl font-semibold">Place Your Bid</h2>
              </div>
              
              <div className="p-6">
                {new Date(auctionDetails?.startTime) > Date.now() ? (
                  <div className="text-center py-6">
                    <FaClock className="mx-auto text-3xl text-gray-400 mb-3" />
                    <p className="text-gray-600">Auction hasn't started yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Starts on {new Date(auctionDetails?.startTime).toLocaleDateString()}
                    </p>
                  </div>
                ) : new Date(auctionDetails?.endTime) < Date.now() ? (
                  <div className="text-center py-6">
                    <FaGavel className="mx-auto text-3xl text-gray-400 mb-3" />
                    <p className="text-gray-600">Auction has ended</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ended on {new Date(auctionDetails?.endTime).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBidSubmit}>
                    <div className="mb-4">
                      <label htmlFor="bidAmount" className="block text-gray-700 text-sm font-medium mb-2">
                        Your Bid Amount ($)
                      </label>
                      <input
                        type="number"
                        id="bidAmount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#d6482b] focus:border-[#d6482b] transition-all"
                        placeholder={`Min. bid: $${auctionDetails?.startingBid}`}
                        min={auctionDetails?.startingBid}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-[#d6482b] hover:bg-[#c03e25] text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                      Place Bid
                    </button>           
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By placing a bid, you agree to our terms and conditions
                    </p>
                  </form>
                )}
              </div>
            </div>}
            
            {/* Bidders List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 py-4 px-6 border-b">
                <h2 className="text-gray-800 text-xl font-semibold">Current Bidders</h2>
              </div>
              
              <div className="divide-y">
                {auctionBidders && auctionBidders.length > 0 && new Date(auctionDetails?.startTime) < Date.now() ? (
                  auctionBidders.map((bidder, index) => (
                    <div key={bidder._id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={bidder.profileImage} 
                            alt={bidder.username}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm" 
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
                        {index === 0 ? (
                          <span className="text-green-600 font-bold">Highest Bidder</span>
                        ) : (
                          <span className={`
                            ${index === 1 ? 'text-blue-600' : index === 2 ? 'text-amber-600' : 'text-gray-600'}
                            font-medium
                          `}>
                            #{index + 1}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FaUser className="mx-auto text-3xl text-gray-300 mb-3" />
                    <p className="text-gray-500">No bidders yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Items Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Related Auctions</h2>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* We'll show 3 items at a time on desktop, 2 on tablet, 1 on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {relatedItems.map((item) => (
                  <Link 
                    to={`/auction/item/${item._id}`} 
                    key={item._id}
                    onClick={ScrollHandler}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div className="h-48 bg-gray-100 flex justify-center items-center p-4">
                      <img 
                        src={item.imgSrc?.url || '/public/logo.svg'} 
                        alt={item.title} 
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">{item.title}</h3>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-[#d6482b] font-bold">${item.startingBid.toLocaleString()}</p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1" size={12} />
                          <span>
                            {new Date(item.endTime) > Date.now() 
                              ? 'Active' 
                              : 'Ended'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;