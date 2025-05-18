import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Edit2, MapPin, Phone, Mail, Calendar, CreditCard, Award, DollarSign, Briefcase } from "lucide-react";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen w-full ml-0 pt-20 lg:pl-64 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-48 w-full bg-gradient-to-r from-orange-400 to-red-500 rounded-t-lg"></div>
          <div className="absolute -bottom-16 left-6 md:left-10">
            <div className="relative">
              <img
                src={user?.profileImage?.url || "/imageHolder.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                <Edit2 size={16} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* User Info Cards */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-200">
                  <Edit2 size={16} />
                  <span className="hidden md:inline">Edit Profile</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={18} />
                      <span className="text-sm font-medium">Username</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-6">{user?.userName || "Not specified"}</p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={18} />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-6">{user?.email || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={18} />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-6">{user?.phone || "Not specified"}</p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} />
                      <span className="text-sm font-medium">Address</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-6">{user?.address || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase size={18} />
                      <span className="text-sm font-medium">Role</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-6">{user?.role || "Not specified"}</p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={18} />
                      <span className="text-sm font-medium">Joined On</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-6">{user?.createdAt?.substring(0, 10) || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Details Card - Conditional */}
            {user?.role === "Auctioneer" && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
                  <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-200">
                    <Edit2 size={16} />
                    <span className="hidden md:inline">Update Payment Info</span>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard size={18} />
                        <span className="text-sm font-medium">Bank Name</span>
                      </div>
                      <p className="text-gray-800 font-medium pl-6">{user?.paymentMethods?.bankTransfer?.bankName || "Not specified"}</p>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard size={18} />
                        <span className="text-sm font-medium">IBAN Number</span>
                      </div>
                      <p className="text-gray-800 font-medium pl-6">{user?.paymentMethods?.bankTransfer?.bankAccountNumber || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={18} />
                        <span className="text-sm font-medium">Account Name</span>
                      </div>
                      <p className="text-gray-800 font-medium pl-6">{user?.paymentMethods?.bankTransfer?.bankAccountName || "Not specified"}</p>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={18} />
                        <span className="text-sm font-medium">Easypaisa Number</span>
                      </div>
                      <p className="text-gray-800 font-medium pl-6">{user?.paymentMethods?.easypaisa?.easypaisaAccountNumber || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={18} />
                        <span className="text-sm font-medium">Paypal Email</span>
                      </div>
                      <p className="text-gray-800 font-medium pl-6">{user?.paymentMethods?.paypal?.paypalEmail || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Stats & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Summary</h2>
              
              {user?.role === "Auctioneer" && (
                <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <DollarSign size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Unpaid Commission</p>
                        <p className="text-lg font-bold text-gray-800">${user?.unpaidCommission || "0"}</p>
                      </div>
                    </div>
                    <button className="text-xs text-orange-500 font-medium hover:underline">View Details</button>
                  </div>
                </div>
              )}
              
              {user?.role === "Bidder" && (
                <>
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-500 p-2 rounded-lg">
                          <Award size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Auctions Won</p>
                          <p className="text-lg font-bold text-gray-800">{user?.auctionsWon || "0"}</p>
                        </div>
                      </div>
                      <button className="text-xs text-orange-500 font-medium hover:underline">View All</button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-500 p-2 rounded-lg">
                          <DollarSign size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Money Spent</p>
                          <p className="text-lg font-bold text-gray-800">${user?.moneySpent || "0"}</p>
                        </div>
                      </div>
                      <button className="text-xs text-orange-500 font-medium hover:underline">Details</button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md flex items-center gap-2 transition duration-200">
                    <Edit2 size={16} />
                    <span>Edit Profile</span>
                  </button>
                  
                  {user?.role === "Auctioneer" && (
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md flex items-center gap-2 transition duration-200">
                      <DollarSign size={16} />
                      <span>Withdraw Commission</span>
                    </button>
                  )}
                  
                  {user?.role === "Bidder" && (
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md flex items-center gap-2 transition duration-200">
                      <Award size={16} />
                      <span>View Won Auctions</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;