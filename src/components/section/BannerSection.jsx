import {Swiper, SwiperSlide} from 'swiper/react'
import  SwiperCore, {
    EffectFade,
    Mousewheel,
    Pagination,
    Autoplay
}  from 'swiper'
import Banner from '../banner/Banner'
import { baner1Bg, baner1mid, baner1Right, baner2Bg, baner2mid, baner2Right, baner3Bg, baner3mid, baner3right } from '../../assets/images/banner/bannerImg'
SwiperCore.use([Mousewheel, Pagination, EffectFade ,Autoplay])
const swiperOption = {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: false,
    pagination: false,
    effect: 'fade',
    speed: 1000,
    autoplay: {
        delay: 2500
    },
    loop: true

}

const dataBanner = [
    {
        imgRight: baner1Right,
        imgBg: baner1Bg,
        imgMid: baner1mid,
        frontText: 'New',
        behindText: 'arrivals',
        color:'rgb(226, 140, 42)'
    },
    {
        imgRight: baner2Right,
        imgBg: baner2Bg,
        imgMid: baner2mid,
        frontText: 'Big',
        behindText: 'sale',
        color:'rgb(26, 10, 142)'
    },
    {
        imgRight: baner3right,
        imgBg: baner3Bg,
        imgMid: baner3mid,
        frontText: 'hot',
        behindText: 'product',
        color:'rgb(226, 40, 42)'
    }
]

const BannerSection = () => {

  return (
    <>
        <Swiper {...swiperOption}>
            {dataBanner.map((cur, index) =>(
                <SwiperSlide key={index}>
                    <div>
                        <Banner data={cur}/>
                    </div>
                </SwiperSlide>
                )
            )}
        </Swiper>
    </>
  )
}

export default BannerSection