import { fetchLeaderboard } from '@/store/slice/userSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LeaderboardPage = () => {
  // Using sample data for display - in production, use the redux state
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

  const { leaderboard } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboard());
  },[dispatch])

  // Badge colors based on position
  const getBadgeColor = (index) => {
    switch (index) {
      case 0: return 'bg-yellow-500'; // Gold
      case 1: return 'bg-gray-300'; // Silver
      case 2: return 'bg-amber-700'; // Bronze
      default: return 'bg-gray-100'; // Others
    }
  };

  return (
    <section className='my-12 lg:px-5'>
      <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Rank</th>
                <th className='py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User</th>
                <th className='py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Bid</th>
                <th className='py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Auctions Won</th>
              </tr>
            </thead>
            
            <tbody className='divide-y divide-gray-200'>
              {leaderboard.slice(0, 10).map((element, index) => (
                <tr 
                  key={element._id} 
                  className={`${index < 3 ? 'bg-opacity-10 ' + getBadgeColor(index).replace('bg-', 'bg-opacity-10 bg-') : ''} hover:bg-gray-50 transition-colors`}
                >
                  <td className='py-4 px-6'>
                    <div className='flex items-center'>
                      <div className={`${getBadgeColor(index)} text-white ${index == 3 && 'text-black'} font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  
                  <td className='py-4 px-6'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-200'>
                        <img 
                          src={element.profileImage?.url} 
                          alt={element.username}
                          className='h-full w-full object-cover' 
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='text-base font-medium text-gray-900'>{element.username}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className='py-4 px-6'>
                    <div className='text-base text-gray-900 font-medium'>
                      {element.moneySpant.toLocaleString()}
                    </div>
                  </td>
                  
                  <td className='py-4 px-6'>
                    <div className='flex items-center'>
                      <span className='text-base text-gray-900 font-medium'>{element.auctionWin}</span>
                      <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        Win{element.auctionWin !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {leaderboard.length === 0 && (
          <div className='text-center py-12'>
            <svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
            <h3 className='mt-2 text-xl font-medium text-gray-900'>No leaderboard data yet</h3>
            <p className='mt-1 text-gray-500'>Be the first to win an auction and top the leaderboard!</p>
          </div>
        )}
      </div>
      
      <div className='flex justify-center mt-8'>
        <Link 
          to='/leaderboard' 
          className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        >
          View Full Leaderboard
        </Link>
      </div>
    </section>
  );
}

export default LeaderboardPage;