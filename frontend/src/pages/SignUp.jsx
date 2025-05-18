import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '@/store/slice/userSlice';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaUserTag, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    cusBankName: "",
    razorpayId: "",
    paypalEmail: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("profileImage", profileImage);
    
    if (formData.role === "Auctioneer") {
      formDataToSend.append("bankAccountName", formData.bankAccountName);
      formDataToSend.append("bankAccountNumber", formData.bankAccountNumber);
      formDataToSend.append("bankName", formData.bankName === "other" ? formData.cusBankName : formData.bankName);
      formDataToSend.append("razorpayId", formData.razorpayId);
      formDataToSend.append("paypalEmail", formData.paypalEmail);
    }

    dispatch(register(formDataToSend));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImagePreview(reader.result);
        setProfileImage(file);
      };
    }
  };

  // Check if role is bidder to disable payment fields
  const isPaymentFieldDisabled = formData.role !== "Auctioneer";

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 py-6">
          <h1 className="text-center text-white font-bold text-3xl md:text-4xl">CREATE ACCOUNT</h1>
        </div>
        
        <div className="p-6 md:p-8">
          <form onSubmit={handleRegister} className="space-y-8">
            {/* Personal Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaUser className="mr-2 text-orange-500" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-3 border"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-3 border"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-3 border"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-3 border"
                      placeholder="123 Main St, City"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserTag className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-3 border"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Auctioneer">Auctioneer</option>
                      <option value="Bidder">Bidder</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-3 border"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Image Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Profile Image</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
                  {profileImagePreview ? (
                    <img 
                      src={profileImagePreview} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaUser className="text-gray-400 text-4xl" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    onChange={imageHandler}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG or GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>
            
            {/* Payment Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                <FaCreditCard className="mr-2 text-orange-500" />
                Payment Method Details
                <span className="ml-2 text-xs font-normal text-gray-500">(For Auctioneers Only)</span>
              </h2>
              
              <div className="space-y-6">
                {/* Bank Details */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-3">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Bank Name</label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-2 border"
                        disabled={isPaymentFieldDisabled}
                      >
                        <option value="">Select Bank</option>
                        <option value="SBI">State Bank Of India</option>
                        <option value="HDFC">HDFC</option>
                        <option value="CENRA">CENRA BANK</option>
                        <option value="POST OFFICE">POST OFFICE</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    {formData.bankName === "other" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Custom Bank Name</label>
                        <input
                          type="text"
                          name="cusBankName"
                          value={formData.cusBankName}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-2 border"
                          placeholder="Enter Bank Name"
                          disabled={isPaymentFieldDisabled}
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Number / IFSC</label>
                      <input
                        type="text"
                        name="bankAccountNumber"
                        value={formData.bankAccountNumber}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-2 border"
                        placeholder="XXXX XXXX XXXX"
                        disabled={isPaymentFieldDisabled}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Holder Name</label>
                      <input
                        type="text"
                        name="bankAccountName"
                        value={formData.bankAccountName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-2 border"
                        placeholder="Full Name on Account"
                        disabled={isPaymentFieldDisabled}
                      />
                    </div>
                  </div>
                </div>
                
                {/* UPI and PayPal */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-3">Digital Payment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-500 mb-1">razorpayId</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMoneyBillWave className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="razorpayId"
                          value={formData.razorpayId}
                          onChange={handleChange}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-2 border"
                          placeholder="username@bank"
                          disabled={isPaymentFieldDisabled}
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-500 mb-1">PayPal Email</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="paypalEmail"
                          value={formData.paypalEmail}
                          onChange={handleChange}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm py-2 border"
                          placeholder="paypal@email.com"
                          disabled={isPaymentFieldDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Your Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;