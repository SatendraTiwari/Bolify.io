import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { createAuction } from "@/store/slice/auctionSlice";
import { Camera, Clock, Calendar, Upload, Grid, Tag, FileText, Briefcase } from "lucide-react";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
    }
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    await dispatch(createAuction(formData));
    navigateTo('/view-my-auctions');
  };



  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if(!isAuthenticated && user.role !== "Auctioner"){
        navigateTo('/')
    }
  },[isAuthenticated])

  const customDatePickerStyle = `
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker__input-container input {
      width: 100%;
      padding: 0.5rem 0;
      background: transparent;
      border-bottom: 1px solid #78716c;
    }
    .react-datepicker__input-container input:focus {
      outline: none;
      border-bottom: 2px solid #D6482B;
    }
  `;

  return (
    <article className="w-full min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:pl-[320px]">
      <style>{customDatePickerStyle}</style>
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center mb-6">
          <div className="h-12 w-2 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Create Auction
          </h1>
        </div>
        <p className="text-gray-600 ml-6 max-w-2xl">
          List your item for auction by providing details below. The more information you provide, the better chances of successful bidding.
        </p>
      </div>
      
      {/* Form Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
        <div className="p-6 sm:p-8">
          <form className="space-y-8" onSubmit={handleCreateAuction}>
            
            {/* Form Section: Basic Details */}
            <div>
              <div className="flex items-center mb-6">
                <Briefcase size={20} className="text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Basic Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter item title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Category</option>
                      {auctionCategories.map((element) => (
                        <option key={element} value={element}>
                          {element}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Grid size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Condition</label>
                  <div className="relative">
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Condition</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Tag size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Starting Bid ($)</label>
                  <input
                    type="number"
                    value={startingBid}
                    onChange={(e) => setStartingBid(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter starting amount"
                  />
                </div>
              </div>
            </div>
            
            {/* Form Section: Description */}
            <div>
              <div className="flex items-center mb-6">
                <FileText size={20} className="text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Item Description</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tell bidders about your item</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  rows={6}
                  placeholder="Describe your item's features, history, condition details, etc."
                />
              </div>
            </div>
            
            {/* Form Section: Schedule */}
            <div>
              <div className="flex items-center mb-6">
                <Calendar size={20} className="text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Auction Schedule</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <div className="relative">
                    <DatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={"MMMM d, yyyy h:mm aa"}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholderText="Select start date and time"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <div className="relative">
                    <DatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat={"MMMM d, yyyy h:mm aa"}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholderText="Select end date and time"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Section: Images */}
            <div>
              <div className="flex items-center mb-6">
                <Camera size={20} className="text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Item Image</h2>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload a high-quality image of your item</label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="p-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center cursor-pointer">
                      {imagePreview ? (
                        <div className="w-full flex flex-col items-center">
                          <img 
                            src={imagePreview} 
                            alt={title || "Item preview"} 
                            className="max-h-64 object-contain mb-4"
                          />
                          <p className="text-sm text-gray-500">Click to change image</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6">
                          <div className="mb-3 p-3 bg-orange-50 rounded-full">
                            <Upload size={24} className="text-orange-500" />
                          </div>
                          <p className="mb-2 text-sm font-medium text-gray-700">
                            Drag and drop or click to upload
                          </p>
                          <p className="text-xs text-gray-500">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        accept="image/*"
                        onChange={imageHandler} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 min-w-[200px]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Auction...
                  </div>
                ) : "Create Auction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default CreateAuction;