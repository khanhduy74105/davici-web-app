import { useLayoutEffect } from "react";
import { useRef } from "react";
import "./banner.scss";
import {gsap} from 'gsap'
const Banner = (props) => {
  const { data } = props;
    const banner = useRef()
    useLayoutEffect(()=>{
        const ctx = gsap.context(() => {
            gsap.fromTo(".mid-img", {
              xPercent: -50,
              yPercent: -60,
              repeat: -1,
              repeatDelay: 1,
              ease:'power1.out',
              yoyo: true,
              duration: 2500
            },{
                xPercent: -50,
                yPercent: -45,
                repeat: -1,
                repeatDelay: 1,
                yoyo: true
              }
            );
          }, banner);
          const ctx2 = gsap.context(() => {
            const tl = gsap.timeline({repeat: -1});
                tl.to(".left-img", {y: 30,ease:'power1.out', duration: 0.75});
                tl.to(".left-img", {x:-30,ease:'power1.out', duration: 0.75});
                tl.to(".left-img", {y:0,ease:'power1.out', duration: 0.75}); 
                tl.to(".left-img", {x:0,ease:'power1.out', duration: 0.75}); 
          }, banner);
          return () => {
            ctx.revert();
            ctx2.revert()

        }
    },[])
  return (
    <div className="banner" style={{ backgroundImage: `url(${data.imgBg})`, color: `${data.color}` }} ref={banner}>
      <div className="banner__container">
        <p className="behind-text">{data.behindText}</p>
        <img src={data.imgMid} alt="" className="mid-img" />
        <p className="front-text">{data.frontText}</p>
        <img src={data.imgRight} alt="" className="left-img" />
      </div>
      <div className="banner__button">
        <a href="/shop">
          Shop now 
            <span className="material-symbols-outlined">double_arrow</span>
        </a>
      </div>
    </div>
  );
};

export default Banner;
