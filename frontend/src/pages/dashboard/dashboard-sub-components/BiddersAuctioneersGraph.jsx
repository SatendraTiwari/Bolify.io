import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BiddersAuctioneersGraph = () => {
  // Example data - replace with actual data from your Redux store
const { totalAuctioneers, totalBidders } = useSelector((state) => state.superAdmin);

  // const totalBidders = [22, 28, 32, 35, 30, 38, 42, 45, 40, 43, 47, 50];
  // const totalAuctioneers = [10, 12, 14, 16, 15, 18, 20, 22, 19, 21, 23, 25];
  
  const [chartType, setChartType] = useState("line");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [timeRange, setTimeRange] = useState("yearly");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate summary data
  const totalBiddersCount = totalBidders.reduce((sum, count) => sum + count, 0);
  const totalAuctioneersCount = totalAuctioneers.reduce((sum, count) => sum + count, 0);
  const latestBiddersCount = totalBidders[totalBidders.length - 1];
  const latestAuctioneersCount = totalAuctioneers[totalAuctioneers.length - 1];
  
  // Bidders growth calculation
  const biddersDifference = latestBiddersCount - totalBidders[totalBidders.length - 2];
  const biddersGrowthPercentage = ((biddersDifference / totalBidders[totalBidders.length - 2]) * 100).toFixed(1);
  
  // Auctioneers growth calculation
  const auctioneersDifference = latestAuctioneersCount - totalAuctioneers[totalAuctioneers.length - 2];
  const auctioneersGrowthPercentage = ((auctioneersDifference / totalAuctioneers[totalAuctioneers.length - 2]) * 100).toFixed(1);

  // Month labels
  const fullMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // For responsive labels
  const getResponsiveLabels = () => {
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (timeRange === "quarterly") {
      return ["Q1", "Q2", "Q3", "Q4"];
    }
    
    return windowWidth < 640 ? shortMonths : fullMonths;
  };

  // Get quarterly data if needed
  const getQuarterlyData = (data) => {
    return [
      data.slice(0, 3).reduce((sum, val) => sum + val, 0) / 3,
      data.slice(3, 6).reduce((sum, val) => sum + val, 0) / 3,
      data.slice(6, 9).reduce((sum, val) => sum + val, 0) / 3,
      data.slice(9, 12).reduce((sum, val) => sum + val, 0) / 3
    ];
  };

  // Determine chart data based on time range
  const getChartData = (data) => {
    return timeRange === "quarterly" ? getQuarterlyData(data) : data;
  };

  // Chart data
  const data = {
    labels: getResponsiveLabels(),
    datasets: [
      {
        label: "Bidders",
        data: getChartData(totalBidders),
        borderColor: "#4F46E5", // Indigo
        backgroundColor: chartType === "line" ? "rgba(79, 70, 229, 0.2)" : "rgba(79, 70, 229, 0.7)",
        borderWidth: chartType === "line" ? 3 : 1,
        pointRadius: chartType === "line" ? 4 : 0,
        pointHoverRadius: chartType === "line" ? 6 : 0,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#4F46E5",
        pointBorderWidth: 2,
        tension: chartType === "line" ? 0.4 : 0,
        fill: chartType === "line" ? "origin" : undefined,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: "Auctioneers",
        data: getChartData(totalAuctioneers),
        borderColor: "#EC4899", // Pink
        backgroundColor: chartType === "line" ? "rgba(236, 72, 153, 0.2)" : "rgba(236, 72, 153, 0.7)",
        borderWidth: chartType === "line" ? 3 : 1,
        pointRadius: chartType === "line" ? 4 : 0,
        pointHoverRadius: chartType === "line" ? 6 : 0,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#EC4899",
        pointBorderWidth: 2,
        tension: chartType === "line" ? 0.4 : 0,
        fill: chartType === "line" ? "origin" : undefined,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value.toLocaleString();
          },
          color: "#6B7280",
          font: {
            size: windowWidth < 640 ? 10 : 12,
            family: "'Inter', sans-serif",
          },
        },
        title: {
          display: true,
          text: "Count",
          color: "#374151",
          font: {
            size: windowWidth < 640 ? 12 : 14,
            weight: "600",
            family: "'Inter', sans-serif",
          },
          padding: { bottom: 10 }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: windowWidth < 640 ? 10 : 12,
            family: "'Inter', sans-serif",
          },
        },
        title: {
          display: true,
          text: timeRange === "quarterly" ? "Quarter" : "Month",
          color: "#374151",
          font: {
            size: windowWidth < 640 ? 12 : 14,
            weight: "600",
            family: "'Inter', sans-serif",
          },
          padding: { top: 10 }
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
          color: "#374151",
          font: {
            size: windowWidth < 640 ? 11 : 13,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#111827",
        bodyColor: "#4B5563",
        titleFont: {
          size: 14,
          weight: "bold",
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        displayColors: true,
        borderColor: "rgba(229, 231, 235, 1)",
        borderWidth: 1,
        callbacks: {
          title: function(tooltipItems) {
            return timeRange === "quarterly" 
              ? `Quarter ${tooltipItems[0].dataIndex + 1}` 
              : fullMonths[tooltipItems[0].dataIndex];
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
      onHover: (event, elements) => {
        setIsHovering(elements.length > 0);
      }
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    transitions: {
      active: {
        animation: {
          duration: 300,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="px-5 py-4 sm:px-6 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Users Overview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track bidders and auctioneers registration trends
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <select
              className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition-colors"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="yearly">Monthly View</option>
              <option value="quarterly">Quarterly View</option>
            </select>
            
            <div className="flex rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => setChartType("line")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  chartType === "line"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  chartType === "bar"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Bar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-white">
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
          <p className="text-xs sm:text-sm font-medium text-indigo-600">Total Bidders</p>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{totalBiddersCount}</h4>
          <div className="flex items-center mt-2 text-xs text-indigo-700">
            <span className={`inline-flex items-center ${biddersDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {biddersDifference >= 0 ? '↑' : '↓'} {Math.abs(biddersDifference)}
            </span>
            <span className="ml-1 text-gray-500">({biddersGrowthPercentage}%)</span>
          </div>
        </div>
        
        <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
          <p className="text-xs sm:text-sm font-medium text-pink-600">Total Auctioneers</p>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{totalAuctioneersCount}</h4>
          <div className="flex items-center mt-2 text-xs text-pink-700">
            <span className={`inline-flex items-center ${auctioneersDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {auctioneersDifference >= 0 ? '↑' : '↓'} {Math.abs(auctioneersDifference)}
            </span>
            <span className="ml-1 text-gray-500">({auctioneersGrowthPercentage}%)</span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-xs sm:text-sm font-medium text-blue-600">Bidder Ratio</p>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
            {(totalBiddersCount / (totalBiddersCount + totalAuctioneersCount) * 100).toFixed(1)}%
          </h4>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${(totalBiddersCount / (totalBiddersCount + totalAuctioneersCount) * 100).toFixed(1)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <p className="text-xs sm:text-sm font-medium text-purple-600">Auctioneer Ratio</p>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
            {(totalAuctioneersCount / (totalBiddersCount + totalAuctioneersCount) * 100).toFixed(1)}%
          </h4>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: `${(totalAuctioneersCount / (totalBiddersCount + totalAuctioneersCount) * 100).toFixed(1)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className={`relative p-4 sm:p-6 ${isHovering ? 'cursor-pointer' : ''}`}>
        <div className="h-72 sm:h-80 md:h-96">
          {chartType === "line" ? (
            <Line data={data} options={options} />
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
      
      {/* Legend Card */}
      <div className="bg-gray-50 border-t border-gray-200 px-5 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="h-3 w-3 rounded-full bg-indigo-600 mr-2"></div>
            <span className="font-medium text-gray-700">Bidders</span>
            <span className="mx-2">—</span>
            <span>Users who participate in auctions</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-pink-500 mr-2"></div>
            <span className="font-medium text-gray-700">Auctioneers</span>
            <span className="mx-2">—</span>
            <span>Users who create and manage auctions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddersAuctioneersGraph;