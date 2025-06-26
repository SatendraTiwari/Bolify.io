import React, { useEffect } from "react"
import {BrowserRouter as Router , Routes, Route}  from  "react-router-dom"
import Home from "./pages/Home"
import SideDrawer from './layout/SideDrawer'
import { ToastContainer, toast } from 'react-toastify';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import SubmitCommission from './pages/SubmitCommission'
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, fetchUser } from "./store/slice/userSlice";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import { getAllAuctionItems } from "./store/slice/auctionSlice";
import Leaderboard from "./pages/Leaderboard";
import Auction from "./pages/Auction";
import AuctionItem from "./pages/AuctionItem";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuctions from "./pages/ViewMyAuctions";
import Headers from "./layout/Headers";
import ViewAuctionDetails from "./pages/ViewAuctionDetails";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProfile from "./pages/UserProfile";
import Contact from "./pages/Contact"
import ViewAuctionDetailsForSuperAdmin from "./pages/ViewAuctionDetailsForSuperAdmin";

function App() {
  const dispatch = useDispatch(); 
  // user is not logout automatically 
  const {isAuthenticated} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  },[]);


  return (
    <Router>
      <SideDrawer />
      <Headers/>
      <Login />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/submit-commission" element={<SubmitCommission/>} />
          <Route path="/how-it-works-info" element={<HowItWorks/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/auctions" element={<Auction/>} />
          <Route path="/auction/item/:id" element={<AuctionItem/>} />
          <Route path="/create-auction" element={<CreateAuction/>} />
          <Route path="/view-my-auctions" element={<ViewMyAuctions/>} />
          <Route path="/view/details/:id" element={<ViewAuctionDetails/>} />

          <Route path="/details/:id" element={<ViewAuctionDetailsForSuperAdmin/>} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/me" element={<UserProfile />} />
        </Routes>
      <ToastContainer position="top-right" />
    </Router>
  )
}

export default App
