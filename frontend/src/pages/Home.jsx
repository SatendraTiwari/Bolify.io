import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useFetcher } from 'react-router-dom';
import { setShowLogin } from "../store/slice/loginShow";
import FeaturedAuctions from './home-sub-components/FeaturedAuctions';
import LeaderboardPage from './home-sub-components/LeaderboardPage';
import UpcomingAuctions from './home-sub-components/UpcomingAuctions';

const Home = () => {
  const work = [
    {
      title: "Post Items",
      description: "Auctioneer posts items for bidding",
      icon: "📝"
    },
    {
      title: "Place Bids",
      description: "Bidding place bids on listed items",
      icon: "🔨"
    },
    {
      title: "Win Notification",
      description: "Highest bidder auctioneer pays 5% fee.",
      icon: "🏆"
    },
  ];

  

  const { isAuthenticated } = useSelector((state) => state.user);
  // const isAuthenticated = true;
  const { loginShow } = useSelector((state) => state.logShow);
  const dispatch = useDispatch();

  const toggleLoginShow = () => {
    dispatch(setShowLogin({ loginShow: !loginShow }));
  };

  return (
    <>
      <section className="section animate-slidUp transition-all duration-500">
        {/* Hero Section */}
        <div className="pt-20 px-5 max-w-7xl">
          <div className="flex flex-col items-start md:flex-row md:items-center justify-between">

            <div className="max-w-xl">
              <div className="inline-block px-4 py-2 rounded-full bg-orange-50 text-amber-700 font-semibold mb-6 animate-fadeIn transition-all duration-500">
                Transparency Leads to Your Victory
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-2">
                Transparent Auctions
              </h1>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-[#D6482B] leading-tight mb-6">
                Be The Winner
              </h1>

              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Join our transparent auction platform where every bid is visible and fair. Find unique items and bid with confidence.
              </p>

              {!isAuthenticated  && (
                <div className="flex flex-wrap gap-4 animate-slidUp transition-all duration-500">
                  <Link to="/sign-up" className="bg-[#D64828] hover:bg-[#c13e21] text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-orange-200">
                    Sign Up
                  </Link>
                  <button
                    onClick={toggleLoginShow}
                    className="bg-white text-gray-800 border border-gray-200 hover:border-[#D64828] hover:text-[#D64828] font-semibold px-8 py-3 rounded-lg transition-all shadow-md"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            <div className="hidden md:block w-full max-w-md
           ">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-orange-100 rounded-full opacity-50"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-red-100 rounded-full opacity-50"></div>
                <img
                  src="../public/logo.svg"
                  alt="Auction Banner"
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="mt-24 mb-16 animate-fadeIn transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="h-1 w-10 bg-[#D64828] mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-800">How it Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {work.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Auctions Section */}
          <div className="mb-16 animate-fadeIn transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="h-1 w-10 bg-[#D64828] mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-800">Featured Auctions</h2>
            </div>
            
            <FeaturedAuctions />
          </div>

          {/* Upcoming Auctions Section */}
          <div className="mb-16 animate-fadeIn transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="h-1 w-10 bg-[#D64828] mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Auctions</h2>
            </div>
            <UpcomingAuctions />
          </div>

          {/* Leaderboard Section */}
          <div className="mb-16 animate-fadeIn transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className='flex items-center mb-8'>
                <div className='h-1 w-10 bg-[#d6482b] mr-4'></div>
                <h2 className='text-3xl font-bold'>
                  <span className='text-gray-800'>Top 10</span>
                  <span className='text-[#d6482b] ml-2'>Leaderboard</span>
                </h2>
              </div>

            </div>
            <LeaderboardPage />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 my-16 text-center shadow-xl animate-slidUp transition-all duration-500">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Bidding?</h2>
            <p className="text-white text-lg mb-6 max-w-lg mx-auto">Join thousands of bidders who find unique items at great prices every day.</p>

            {!isAuthenticated && (
              <div className="flex justify-center gap-4">
                <Link to="/sign-up" className="bg-white text-red-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all">
                  Get Started
                </Link>
                <button
                  onClick={toggleLoginShow}
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-red-500 font-semibold px-8 py-3 rounded-lg transition-all"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;