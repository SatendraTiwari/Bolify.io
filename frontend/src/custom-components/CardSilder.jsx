import React from 'react'
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const CardSilder = ({ productData }) => {

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}


        breakpoints={{
          0: { slidesPerView: 1 },
          520: { slidesPerView: 1 },
          950: { slidesPerView: 1 },
        }}
        className="overflow-hidden w-full md:h-full  md:w-full'"
      >
        {productData.map((product) => (
          <SwiperSlide key={product._id}>
            <div>
              hEllo
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default CardSilder