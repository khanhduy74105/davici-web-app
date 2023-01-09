import { Swiper, SwiperSlide } from 'swiper/react'
import  SwiperCore, {
    EffectFade,
    Mousewheel,
    Pagination,
    Autoplay
}  from 'swiper'
SwiperCore.use([Mousewheel, Pagination, EffectFade ,Autoplay])

const Slide = () => {
    const swiperOption = {
        slidesPerView: 2,
        spaceBetween: 0,
        navigation: true
    }
  return (
    <>
    <Swiper {...swiperOption}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  )
}

export default Slide