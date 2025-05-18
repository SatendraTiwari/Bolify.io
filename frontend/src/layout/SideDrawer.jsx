import React, { useEffect, useState } from 'react';

import { RiAuctionFill, RiInstagramFill } from 'react-icons/ri';
import { MdLeaderboard, MdDashboard } from 'react-icons/md';
import { SiGnuprivacyguard, SiGooglesearchconsole } from 'react-icons/si';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosCreate, IoMdCloseCircleOutline, IoMdLogIn } from 'react-icons/io';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/userSlice';
import { setShowLogin, setSideBarShow } from '@/store/slice/loginShow';
import { Link } from 'react-router-dom';

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const screenWidth = window.innerWidth;
  // const isAuthenticated = true

  // const user = {
  //   role : "Auctioner"
  // };
  const { loginShow, sidebarShow } = useSelector((state) => state.logShow);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());
  const toggleLoginShow = () => dispatch(setShowLogin({ loginShow: !loginShow, sidebarShow: sidebarShow }));

  const toggleSidebarShow = () => dispatch(setSideBarShow({ loginShow: !loginShow, sidebarShow: !sidebarShow }))

  const handleSidebarToggle = () => {
    if (screenWidth <= 1022) {
      toggleSidebarShow();
    }
  };


  useEffect(() => {
    if(screenWidth <= 1022) toggleSidebarShow();
  }, [screenWidth])



  return (
    <>
      {/* Hamburger Button */}
      {!sidebarShow ? (<div
        onClick={toggleSidebarShow}
        className='fixed right-5 top-5 z-50 bg-[#d6482b] text-white text-3xl p-2 rounded-full shadow-lg hover:bg-[#b33a24] transition-colors duration-300 '
      >
        <GiHamburgerMenu />
      </div>) : (
        <div
          onClick={toggleSidebarShow}
          className='fixed right-5 top-5 z-50 bg-[#d6482b] text-white text-3xl p-2 rounded-full shadow-lg hover:bg-[#b33a24] transition-colors duration-300 '
        >
          <IoMdCloseCircleOutline />
        </div>
      )}

      {/* Sidebar Drawer */}
      <div
        onClick={handleSidebarToggle}
        className={`fixed top-0 left-0 h-full w-[100%] sm:w-[300px] bg-[#fdfcfb] z-40 shadow-2xl transition-transform duration-300 ease-in-out border-r border-stone-300 
        ${sidebarShow ? 'translate-x-0' : '-translate-x-full'} `}
      >
        <div className='flex flex-col justify-between h-full p-5'>
          <div className='relative'>
            {/* Branding */}
            <Link to="/" onClick={() => setShow(false)}>
              <h4 className='text-3xl font-bold mb-6 text-gray-800'>
                Boli <span className='text-[#D6482b]'>Fy</span>
              </h4>
            </Link>

            {/* Navigation */}
            <ul className='space-y-4'>
              <li>
                <Link to='/auctions' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                  <RiAuctionFill /> Auctions
                </Link>
              </li>
              <li>
                <Link to='/leaderboard' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                  <MdLeaderboard /> Leaderboard
                </Link>
              </li>

              {/* Auctioner Only */}
              {isAuthenticated && user?.role == 'Auctioneer' && (
                <>
                  <li>
                    <Link to='/submit-commission' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                      <FaFileInvoiceDollar /> Submit Commission
                    </Link>
                  </li>
                  <li>
                    <Link to='/create-auction' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                      <IoIosCreate /> Create Auction
                    </Link>
                  </li>
                  <li>
                    <Link to='/view-my-auctions' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                      <FaEye /> View My Auctions
                    </Link>
                  </li>
                </>
              )}

              {/* Super Admin Only */}
              {isAuthenticated && user?.role === 'Super Admin' && (
                <li>
                  <Link to='/dashboard' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className='mt-6 flex gap-4'>
                <Link
                  to='/sign-up'
                  className='bg-[#D6482b] hover:bg-[#b33a24] text-white font-semibold text-lg px-5 py-2 rounded-lg shadow'
                >
                  Sign Up
                </Link>
                <button
                  onClick={toggleLoginShow}
                  className='bg-white border border-gray-300 hover:border-[#D6482b] text-gray-700 hover:text-[#D6482b] font-semibold text-lg px-5 py-2 rounded-lg shadow'
                >
                  Login
                </button>
              </div>
            ) : (
              <div className='mt-6'>
                <button
                  onClick={handleLogout}
                  className='bg-[#D6482b] hover:bg-[#b33a24] text-white font-semibold text-lg px-5 py-2 rounded-lg shadow'
                >
                  Logout
                </button>
              </div>
            )}

            {/* Divider */}
            <hr className='my-6 border-t-[#d6482b]' />

            {/* Extra Links */}
            <ul className='space-y-4'>
              <li>
                <Link to='/how-it-works-info' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                  <RiAuctionFill /> How it Works
                </Link>
              </li>
              <li>
                <Link to='/about' className='flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-[#D6482b]'>
                  <SiGooglesearchconsole /> About Us
                </Link>
              </li>
            </ul>

            {/* Close Button */}
            <IoMdCloseCircleOutline
              onClick={toggleSidebarShow}
              className='absolute top-0 right-3 text-[28px] text-gray-600 sm:hidden cursor-pointer hover:text-red-500'
            />
          </div>

          {/* Footer Section */}
          <div className='mt-10'>
            <div className='flex items-center gap-3 mb-4'>
              <Link to='/' className='p-2 rounded-full bg-white text-gray-500 hover:text-blue-600 shadow'>
                <FaFacebook />
              </Link>
              <Link to='/' className='p-2 rounded-full bg-white text-gray-500 hover:text-pink-500 shadow'>
                <RiInstagramFill />
              </Link>
            </div>
            <Link to='/contact' className='text-gray-600 hover:text-[#D6482b] font-medium block mb-1'>
              Contact Us
            </Link>
            <p className='text-sm text-gray-500'>&copy; Bolify, LLC</p>
            <p className='text-sm text-gray-500'>
              Designed by{" "}
              <Link to='/' className='hover:text-[#D6482b] font-semibold'>
                CodeByTeamOfSattu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
