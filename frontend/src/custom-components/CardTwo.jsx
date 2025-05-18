import { useState } from "react";
import { Calendar, Clock, ChevronDown, CheckCircle } from "lucide-react";
import DatePicker from "react-datepicker";

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRepublishAuction = () => {
    if (!startTime || !endTime) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        setOpenDrawer(false);
      }, 2000);
    }, 1000);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenDrawer(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
        openDrawer && id ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-in-out ${
          openDrawer && id ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="px-6 pt-4 pb-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            Republish Auction
          </h3>
        </div>

        {/* Form content */}
        <div className="p-6 space-y-6 flex flex-col items-center">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <CheckCircle size={64} className="text-green-500" />
              <p className="text-xl font-medium text-gray-800">Auction Successfully Republished!</p>
            </div>
          ) : (
            <>
              {/* Start Time */}
              <div className="space-y-2 w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700 text-left">Start Time</label>
                <div className="relative">
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200"
                    placeholderText="Select start date and time"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar size={18} className="text-orange-500" />
                  </div>
                </div>
              </div>

              {/* End Time */}
              <div className="space-y-2 w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700 text-left">End Time</label>
                <div className="relative">
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200"
                    placeholderText="Select end date and time"
                    minDate={startTime}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock size={18} className="text-orange-500" />
                  </div>
                </div>
              </div>
              
              {/* Time difference indicator */}
              {startTime && endTime && (
                <div className="py-2 px-4 bg-orange-50 border border-orange-100 rounded-lg w-full max-w-md">
                  <p className="text-sm text-orange-800 text-center">
                    Auction will be active for {Math.round((endTime - startTime) / (1000 * 60 * 60))} hours
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            {!success && (
              <>
                <button
                  onClick={handleRepublishAuction}
                  disabled={!startTime || !endTime || isSubmitting}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                    !startTime || !endTime
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Republish Auction</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setOpenDrawer(false)}
                  className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;