import Card from '@/custom-components/Card'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAuctionItems } from '@/store/slice/auctionSlice'

const FeaturedAuctions = () => {
  const { loading, allAuctions } = useSelector((state) => state.auction)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAuctionItems());
  }, [dispatch])



  return (
    <> {
      allAuctions?.length == 0 ? (
      <>
          <div className=' font-semibold text-center md:text-xl'>Featured Auction is not avaiable</div>
      </>
      ) : (
          <section className='my-8'>
            <div className='flex-wrap  gap-6 md:w-full md:h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 m-4'>
              {
                allAuctions?.slice(0, 8).map(element => {
                  return (
                    <Card
                      key={element._id}
                      title={element.title}
                      imgSrc={element.image?.url}
                      startTime={element.startTime}
                      endTime={element.endTime}
                      startingBid={element.startingBid}
                      id={element._id}
                      className={''}
                      titleStyle={'text-sm'}
                    />
                  )
                })
              }
            </div>
          </section>
        )
    }
    </>
  )
}

export default FeaturedAuctions