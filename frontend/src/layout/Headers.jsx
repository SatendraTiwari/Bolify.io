import { setSideBarShow } from '@/store/slice/loginShow';
import { User2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Headers = () => {
  const { sidebarShow } = useSelector((state) => state.logShow);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const toggleSidebarShow = () => dispatch(setSideBarShow({ sidebarShow: !sidebarShow }));

  const {isAuthenticated} = useSelector(state => state.user);

  return (
    <div className='flex justify-between h-auto shadow-lg border fixed top-0 bg-white w-full z-20'>
      <div className=' relative mt-5 ml-5 '>
        <Link to="/" onClick={() => setShow(false)}>
          <h4 className='text-3xl font-bold mb-6 text-gray-800 '>
            Boli <span className='text-[#D6482b]'>Fy</span>
          </h4>
        </Link>
      </div>
      <div className=' relative mt-5 mr-5'>
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
      </div>
    </div>
  )
}

export default Headers