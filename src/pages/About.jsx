import React from "react";
import "./about.scss";
import {
  aboutBanner,
  aboutBanner1,
  aboutBanner2,
  bgAbout,
  logo,
  logoAbout,
} from "../assets/images";
import Header from "../layouts/header/Header";
import Footer from "../components/footer/Footer";
const About = () => (
  <>
    <Header />
    <div className="about__layout">
      <div
        className="about__banner"
        style={{ backgroundImage: `url(${bgAbout})` }}
      >
        <h3>About</h3>
        <p>
          <a href="/">Home</a>/ <a href="#">About</a>
        </p>
      </div>
      <div className="about__brief">
        <div className="about__brief__header">
          <img src={logoAbout} alt="" />
          <h3>The furture of Davici</h3>
          <h5>GETTING BETTER AND BETTER - TOGETHER</h5>
        </div>
        <div className="about__brief__img">
          <img src={aboutBanner} alt="" />
        </div>
      </div>
      <div className="about__decrips">
        <div className="descript__item">
          <div className="descript__item__img">
            <img src={aboutBanner1} alt="" />
          </div>
          <div className="descript__item__side">
            <div className="descript__item__side__header">
              <h5>we design furniture</h5>
              <h3>simple creative</h3>
            </div>
            <p>
              Ut leo. Vivamus aliquet elit ac nisl. Aenean leo ligula, porttitor
              eu, consequat vitae, eleifend ac enim. Sed cursus turpis vitae
              tortor. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Fusce id purus.In consectetuer
              turpis ut velit. Suspendisse feugiat. Nam quam nunc, blandit vel,
              luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo
              suscipit quam. Suspendisse feugiat. Nam quam nunc, blandit vel,
              luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo
              suscipit quam.
            </p>
          </div>
        </div>
        <div className="descript__item">
          <div className="descript__item__side">
            <div className="descript__item__side__header">
              <h5>we design furniture</h5>
              <h3>design quality</h3>
            </div>
            <p>
              Ut leo. Vivamus aliquet elit ac nisl. Aenean leo ligula, porttitor
              eu, consequat vitae, eleifend ac enim. Sed cursus turpis vitae
              tortor. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia Curae; Fusce id purus.In consectetuer
              turpis ut velit. Suspendisse feugiat. Nam quam nunc, blandit vel,
              luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo
              suscipit quam. Suspendisse feugiat. Nam quam nunc, blandit vel,
              luctus pulvinar, hendrerit id, lorem. Fusce neque. Nam commodo
              suscipit quam.
            </p>
          </div>
          <div className="descript__item__img">
            <img src={aboutBanner2} alt="" />
          </div>
        </div>
      </div>
      <div className="about__map">
        <div className="about__map__header">
          <h4>we desighn furniture</h4>
          <h3>visit ourstore</h3>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1555.539379722716!2d108.25199698449495!3d15.975882242081648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e0!3m2!1svi!2s!4v1673060583260!5m2!1svi!2s"
          width={'100%'}
          height={450}
          style={{border : 0}}
        >
        </iframe>
      </div>
    </div>
    <Footer />
  </>
);

export default About;
