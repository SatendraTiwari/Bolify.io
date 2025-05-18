import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/custom-components/Card';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
// Sample data - would be replaced by Redux state in production
import { getAllAuctionItems } from '@/store/slice/auctionSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setShowLogin } from '@/store/slice/loginShow';

const categories = ['All',"Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",];

const Auction = () => {
  // In a real implementation, we'd use the Redux data
  const { loading, allAuctions } = useSelector(state => state.auction);
  const {isAuthenticated} = useSelector(state => state.user);
  // const { loginShow } = useSelector((state) => state.logShow);
  const dispatch = useDispatch();
  const navigateTo = useNavigate()

  
  useEffect(() => {
    if(!isAuthenticated){
        navigateTo('/');
    }
    dispatch(getAllAuctionItems());
  },[dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Filter auctions based on search term and category
  const filteredAuctions = allAuctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || auction.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort auctions based on selected sort option
  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    if (sortBy === 'price-asc') return a.startingBid - b.startingBid;
    if (sortBy === 'price-desc') return b.startingBid - a.startingBid;
    return 0; // default
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="bg-stone-50 min-h-screen lg:pl-[320px]">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D6482B]"></div>
        </div>
      ) : (
        <article className="ml-0 h-fit w-full px-4 sm:px-6 pt-20 max-w-6xl mx-auto ">
          <section className="my-8 w-full">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-2 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Auctions
                </h1>
              </div>
              <p className="text-stone-600 mt-4">Discover unique items and place your bids on our curated collection of exceptional auctions.</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search auctions..."
                    className="w-full py-2 px-4 pr-10 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B] focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute right-3 top-2.5 text-stone-400">
                    <FaSearch />
                  </div>
                </div>

                {/* Sort */}
                <div className="relative md:w-48">
                  <select
                    className="w-full py-2 px-4 border border-stone-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <div className="absolute right-3 top-2.5 text-stone-400 pointer-events-none">
                    <FaSortAmountDown />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mt-4 overflow-x-auto whitespace-nowrap pb-2">
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-1 rounded-full text-sm ${activeCategory === category
                        ? 'bg-[#D6482B] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Auction Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedAuctions.length > 0 ? (
                sortedAuctions.map((auction) => (
                  <Card
                    key={auction._id}
                    title={auction.title}
                    imgSrc={auction.image?.url}
                    startTime={auction.startTime}
                    endTime={auction.endTime}
                    startingBid={auction.startingBid}
                    id={auction._id}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-xl text-stone-500">No auctions found matching your criteria.</p>
                  <button
                    className="mt-4 px-6 py-2 bg-[#D6482B] text-white rounded-md hover:bg-[#c03d23]"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('All');
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {sortedAuctions.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-100">
                    &laquo;
                  </button>
                  <button className="w-10 h-10 rounded-md bg-[#D6482B] text-white flex items-center justify-center">1</button>
                  <button className="w-10 h-10 rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-100">2</button>
                  <button className="w-10 h-10 rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-100">3</button>
                  <button className="w-10 h-10 rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-100">
                    &raquo;
                  </button>
                </div>
              </div>
            )}
          </section>
        </article>
      )}
    </div>
  );
};

export default Auction;