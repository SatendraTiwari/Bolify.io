import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowLogin } from '@/store/slice/loginShow';

const Leaderboard = () => {
  const { loading, leaderboard, isAuthenticated } = useSelector(state => state.user);
  const { loginShow } = useSelector((state) => state.logShow);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sample data - in production use the Redux state
  const auctionWin = [
    {
      _id: 1,
      username: "jonny",
      moneySpant: 15000,
      auctionWin: 2,
      profileImage: { url: 'https://picsum.photos/200/600' },
    },
    {
      _id: 2,
      username: "alibi",
      moneySpant: 15000,
      auctionWin: 2,
      profileImage: { url: 'https://picsum.photos/200/700' },
    },
    {
      _id: 3,
      username: "mark",
      moneySpant: 15000,
      auctionWin: 2,
      profileImage: { url: 'https://picsum.photos/200/800' },
    },
    {
      _id: 4,
      username: "anaya",
      moneySpant: 15000,
      auctionWin: 2,
      profileImage: { url: 'https://picsum.photos/200/900' },
    },
  ];

  // Uncomment if you want to require authentication
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/');
      dispatch(setShowLogin({loginShow : !loginShow}))
    }
  },[isAuthenticated])

  // Badge and styles based on position
  const getBadgeColor = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-500 text-yellow-900'; // Gold
      case 1: return 'bg-gray-300 text-gray-800'; // Silver
      case 2: return 'bg-amber-700 text-amber-100'; // Bronze
      default: return 'bg-gray-100 text-gray-700'; // Others
    }
  };

  const getRowStyle = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 1: return 'bg-gray-50 border-l-4 border-gray-300';
      case 2: return 'bg-amber-50 border-l-4 border-amber-700';
      default: return '';
    }
  };

  return (
    <>
      {loading ? (<div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d6482b]"></div>
      </div>) :
        <section className="section">
          <div className="px-5 max-w-7xl">
            <div className="flex items-center mb-6">
              <div className="h-12 w-2 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Leaderboard
              </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D6482B]"></div>
                </div>
              ) : (
                <>
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Top Bidders and Winners</h2>
                    <p className="text-gray-600 mt-1">
                      Our most active community members ranked by their bidding activity and wins
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bid Amount</th>
                          <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auctions Won</th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200">
                        {auctionWin.map((element, index) => (
                          <tr
                            key={element._id}
                            className={`${getRowStyle(index)} hover:bg-gray-50 transition-colors`}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className={`${getBadgeColor(index)} w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm`}>
                                  {index + 1}
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-200">
                                  <img
                                    src={element.profileImage?.url}
                                    alt={element.username}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-base font-medium text-gray-900">{element.username}</div>
                                  <div className="text-sm text-gray-500">Member</div>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex flex-col">
                                <div className="text-base font-medium text-gray-900">
                                  {element.moneySpant.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500">Total bid amount</div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className="flex flex-col">
                                  <div className="flex items-center">
                                    <span className="text-base font-medium text-gray-900 mr-2">
                                      {element.auctionWin}
                                    </span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Win{element.auctionWin !== 1 ? 's' : ''}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500">Successful auctions</div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {auctionWin.length === 0 && (
                    <div className="text-center py-16">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No leaderboard data available</h3>
                      <p className="mt-1 text-gray-500">Be the first to participate and top the leaderboard!</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How the Leaderboard Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">Participate in Auctions</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Place bids on items you're interested in. Every bid counts towards your total.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">Win Auctions</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Successfully winning auctions raises your rank on the leaderboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">Climb the Rankings</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Top bidders receive special recognition and may qualify for exclusive features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>}</>
  );
};

export default Leaderboard;