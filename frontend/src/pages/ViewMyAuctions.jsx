import { deleteAuction, getMyAuctionItems } from '@/store/slice/auctionSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { FaClock, FaRegCalendarAlt } from 'react-icons/fa';
import { MdDelete, MdOutlinePublish } from 'react-icons/md';
import { Eye } from 'lucide-react';
import Drawer from '@/custom-components/CardTwo';

const ViewMyAuctions = () => {
  const navigateTo = useNavigate();
  const { myAuctions, loading } = useSelector(state => state.auction);
  const { user, isAuthenticated } = useSelector(state => state.user);
  
  const [openDrawerMap, setOpenDrawerMap] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  
  const dispatch = useDispatch();


  useEffect(() => {
    if(!isAuthenticated && user.role !== "Auctioneer"){
      navigateTo('/');
    }
    dispatch(getMyAuctionItems());
  },[isAuthenticated, dispatch]);




  const handleDeleteAuction = (id) => {
    dispatch(deleteAuction(id));
  };

  const handleOpenDrawer = (id) => {
    setOpenDrawerMap(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleCloseDrawer = (id) => {
    setOpenDrawerMap(prev => ({
      ...prev,
      [id]: false
    }));
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const isActive = (item) => {
    return new Date(item.endTime) > Date.now();
  };
  
  const filteredAuctions = activeFilter === 'all' 
    ? myAuctions 
    : activeFilter === 'active' 
      ? myAuctions.filter(item => isActive(item)) 
      : myAuctions.filter(item => !isActive(item));

      
  return (
    <div className="min-h-screen bg-gray-50 lg:pl-[310px]">
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d6482b]"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 animate-fadeIn transition-all duration-500">My Auctions</h1>
            <p className="mt-2 text-sm text-gray-600 animate-fadeIn transition-all duration-500">
              Manage and monitor all your auction listings
            </p>
          </div>
          
          {/* Filter Tabs */}
          <div className="mb-6 border-b border-gray-200 animate-fadeIn transition-all duration-500">
            <nav className="flex -mb-px space-x-8">
              <button
                onClick={() => setActiveFilter('all')}
                className={`${
                  activeFilter === 'all'
                    ? 'border-[#d6482b] text-[#d6482b]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                All Auctions
              </button>
              <button
                onClick={() => setActiveFilter('active')}
                className={`${
                  activeFilter === 'active'
                    ? 'border-[#d6482b] text-[#d6482b]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter('ended')}
                className={`${
                  activeFilter === 'ended'
                    ? 'border-[#d6482b] text-[#d6482b]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Ended
              </button>
            </nav>
          </div>
          
          {filteredAuctions.length === 0 ? (
            <div className="text-center py-12 animate-fadeIn transition-all duration-500">
              <div className="rounded-full bg-gray-100 p-3 inline-flex mb-4">
                <FaClock className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No auctions found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeFilter === 'all' 
                  ? "You haven't created any auctions yet." 
                  : activeFilter === 'active' 
                    ? "You don't have any active auctions." 
                    : "You don't have any ended auctions."}
              </p>
              <div className="mt-6">
                <Link
                  to="/create-auction"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#d6482b] hover:bg-[#c23a1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6482b]"
                >
                  Create New Auction
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fadeIn transition-all duration-500">
              {filteredAuctions.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md border border-gray-100"
                >
                  <div className="h-48 bg-gray-50 flex justify-center items-center p-4 border-b border-gray-100">
                    <img
                      src={item.image?.url}
                      alt={item.title}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">{item.title}</h3>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaRegCalendarAlt className="mr-1" size={12} />
                        <span>{formatDate(item.endTime)}</span>
                      </div>
                      
                      <div className={`py-1 px-2 rounded-full text-xs font-medium ${
                        isActive(item) 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {isActive(item) ? 'Active' : 'Ended'}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <p className="text-xs text-gray-500">Starting Bid</p>
                        <p className="text-[#d6482b] font-bold text-xl">${item.startingBid.toLocaleString()}</p>
                      </div>
                      
                      {/* This could be where you show current bid if available */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Bids</p>
                        <p className="text-gray-800 font-semibold">{item.bids?.length || 0}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2">
                      <Link
                        to={`/view/details/${item._id}`}
                        className="col-span-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg py-2 flex flex-col items-center justify-center text-gray-700"
                      >
                        <Eye size={18} />
                        <span className="text-xs mt-1">View</span>
                      </Link>
                      
                      <button 
                        onClick={() => handleDeleteAuction(item._id)}
                        className="col-span-4 bg-red-50 hover:bg-red-100 transition-colors rounded-lg py-2 flex flex-col items-center justify-center text-red-600"
                      >
                        <MdDelete size={18} />
                        <span className="text-xs mt-1">Delete</span>
                      </button>
                      
                      <button
                        disabled={isActive(item)}
                        onClick={() => handleOpenDrawer(item._id)}
                        className={`col-span-4 ${
                          isActive(item)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-50 hover:bg-green-100 text-green-600'
                        } transition-colors rounded-lg py-2 flex flex-col items-center justify-center`}
                      >
                        <MdOutlinePublish size={18} />
                        <span className="text-xs mt-1">Republish</span>
                      </button>
                    </div>
                  </div>
                  
                  <Drawer 
                    id={item._id} 
                    openDrawer={openDrawerMap[item._id] || false} 
                    setOpenDrawer={() => handleCloseDrawer(item._id)}
                  />
                </div>
              ))}
            </div>
          )}
          
          {filteredAuctions.length > 0 && (
            <div className="mt-8 flex justify-center animate-fadeIn transition-all duration-500">
              <Link
                to="/create-auction"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#d6482b] hover:bg-[#c23a1f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d6482b]"
              >
                Create New Auction
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;