import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);
  
  const steps = [
    {
      icon: "👤",
      title: "User Registration",
      description:
        "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof."
    },
    {
      icon: "🔨",
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.'
    },
    {
      icon: "📧",
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal."
    },
    {
      icon: "💰",
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent."
    },
    {
      icon: "📄",
      title: "Proof of Payment",
      description:
        "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly."
    },
    {
      icon: "🔄",
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost."
    }
  ];

  return (
    <div className="section">
      <div className="max-w-7xl mx-auto p-5 lg:p-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            How <span className="text-black">Boli</span>Fy Works
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We've simplified the auction process to make it easy, secure, and fair for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`h-2 ${activeStep === index ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200'} transition-all duration-300`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`text-3xl p-3 rounded-full ${activeStep === index ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'} transition-colors duration-300`}>
                    {step.icon}
                  </div>
                  <span className="ml-4 text-gray-400 font-medium">Step {index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              <div className={`h-1 ${activeStep === index ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-transparent'} transition-all duration-300`}></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to={'/sign-up'} className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            Get Started Now
          </Link>
          <p className="mt-4 text-gray-500">Join thousands of satisfied users on PrimeBid today</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;