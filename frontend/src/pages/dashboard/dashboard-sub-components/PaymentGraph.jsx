import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Register ChartJS components
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

const PaymentAnalytics = () => {
  // Example data - replace with actual data from your Redux store
  const monthlyRevenue = [
    12500, 18700, 14200, 21000, 19500, 22700, 
    26800, 23500, 21700, 25000, 28500, 32000
  ];

  // const {monthlyRevenue} = useSelector((state) => state.superAdmin);


  const [chartType, setChartType] = useState("bar");
  const [yearFilter, setYearFilter] = useState("current");
  const [viewMode, setViewMode] = useState("monthly");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Analytics calculations
  const totalRevenue = monthlyRevenue.reduce((sum, value) => sum + value, 0);
  const averageRevenue = totalRevenue / monthlyRevenue.filter(val => val > 0).length || 0;
  const highestRevenue = Math.max(...monthlyRevenue);
  const highestMonth = monthlyRevenue.indexOf(highestRevenue);

  // Get quarterly data if needed
  const getQuarterlyData = () => {
    const quarterlyData = [
      monthlyRevenue.slice(0, 3).reduce((sum, val) => sum + val, 0),
      monthlyRevenue.slice(3, 6).reduce((sum, val) => sum + val, 0),
      monthlyRevenue.slice(6, 9).reduce((sum, val) => sum + val, 0),
      monthlyRevenue.slice(9, 12).reduce((sum, val) => sum + val, 0)
    ];
    return quarterlyData;
  };

  // Month labels
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  // For responsive labels
  const getResponsiveLabels = () => {
    if (viewMode === "quarterly") {
      return quarters;
    }
    
    if (windowWidth < 600) {
      return months.map(month => month.substring(0, 3)); // Jan, Feb, etc.
    }
    return months;
  };

  // Determine chart data based on view mode
  const getChartData = () => {
    return viewMode === "quarterly" ? getQuarterlyData() : monthlyRevenue;
  };

  // Determine max for y axis with some padding
  const yMax = Math.max(5000, Math.ceil(highestRevenue * 1.2 / 1000) * 1000);

  // Chart data configuration
  const data = {
    labels: getResponsiveLabels(),
    datasets: [
      {
        label: "Revenue",
        data: getChartData(),
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return 'rgba(79, 70, 229, 0.8)';
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(79, 70, 229, 0.2)");
          gradient.addColorStop(1, "rgba(79, 70, 229, 0.8)");
          return gradient;
        },
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 2,
        borderRadius: 8,
        tension: 0.4,
        fill: chartType === "line" ? "start" : false,
        pointBackgroundColor: "rgba(79, 70, 229, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(79, 70, 229, 1)",
        pointHoverBorderColor: "#fff",
        hoverBackgroundColor: "rgba(79, 70, 229, 0.9)",
        barPercentage: 0.7,
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
        max: yMax,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          borderDash: [5, 5],
        },
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
          font: {
            size: windowWidth < 600 ? 10 : 12,
            family: "'Inter', sans-serif",
          },
          color: "#6B7280",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: windowWidth < 600 ? 8 : 12,
            family: "'Inter', sans-serif",
          },
          color: "#6B7280",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: viewMode === "monthly" ? "Monthly Revenue" : "Quarterly Revenue",
        font: {
          size: windowWidth < 600 ? 16 : 18,
          weight: "600",
          family: "'Inter', sans-serif",
        },
        color: "#111827",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#111827",
        bodyColor: "#4F46E5",
        titleFont: {
          size: 14,
          weight: "bold",
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: "600",
        },
        padding: 12,
        cornerRadius: 8,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        displayColors: false,
        borderColor: "rgba(79, 70, 229, 0.2)",
        borderWidth: 1,
        callbacks: {
          title: function(tooltipItems) {
            return viewMode === "monthly" 
              ? months[tooltipItems[0].dataIndex]
              : `Quarter ${tooltipItems[0].dataIndex + 1}`;
          },
          label: function(context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Financial performance overview</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
          <select
            className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="current">2025</option>
            <option value="previous">2024</option>
            <option value="all">All Time</option>
          </select>
          
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "monthly" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setViewMode("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "quarterly" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setViewMode("quarterly")}
            >
              Quarterly
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
          <p className="text-sm font-medium text-indigo-700 mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</h3>
          <div className="mt-2 text-xs text-indigo-600 font-medium">All {viewMode === "monthly" ? "months" : "quarters"}</div>
        </div>
        
        <div className="bg-green-50 p-5 rounded-xl border border-green-100">
          <p className="text-sm font-medium text-green-700 mb-1">Average {viewMode === "monthly" ? "Monthly" : "Quarterly"}</p>
          <h3 className="text-2xl font-bold text-gray-900">${averageRevenue.toLocaleString()}</h3>
          <div className="mt-2 text-xs text-green-600 font-medium">Per {viewMode === "monthly" ? "month" : "quarter"}</div>
        </div>
        
        <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
          <p className="text-sm font-medium text-purple-700 mb-1">Highest Revenue</p>
          <h3 className="text-2xl font-bold text-gray-900">${highestRevenue.toLocaleString()}</h3>
          <div className="mt-2 text-xs text-purple-600 font-medium">
            {viewMode === "monthly" ? months[highestMonth] : `Q${Math.floor(highestMonth / 3) + 1}`}
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {viewMode === "monthly" ? "Monthly" : "Quarterly"} Revenue Trend
          </h3>
          
          <div className="flex rounded-lg overflow-hidden border border-gray-300 bg-white shadow-sm">
            <button
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                chartType === "bar" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setChartType("bar")}
            >
              Bar
            </button>
            <button
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                chartType === "line" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setChartType("line")}
            >
              Line
            </button>
          </div>
        </div>
        
        <div className="relative h-72 sm:h-80 md:h-96">
          {chartType === "bar" ? (
            <Bar data={data} options={options} />
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>
      
      {/* Revenue Breakdown Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">
            {viewMode === "monthly" ? "Monthly" : "Quarterly"} Revenue Breakdown
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {viewMode === "monthly" ? "Month" : "Quarter"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {viewMode === "monthly" ? (
                monthlyRevenue.map((revenue, index) => (
                  <tr key={index} className={index === highestMonth ? "bg-indigo-50" : "hover:bg-gray-50"}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">{months[index]}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center">
                        <span className="w-16">{totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0}%</span>
                        <div className="flex-grow ml-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                getQuarterlyData().map((revenue, index) => (
                  <tr key={index} className={Math.floor(highestMonth / 3) === index ? "bg-indigo-50" : "hover:bg-gray-50"}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">Quarter {index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${revenue.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center">
                        <span className="w-16">{totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0}%</span>
                        <div className="flex-grow ml-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentAnalytics;