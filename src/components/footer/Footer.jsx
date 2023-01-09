import { logo } from '../../assets/images'
import './footer.scss'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer__category">
            <div className="footer__category__col">
                <img src={logo} alt="" />
            </div>
            <div className="footer__category__col">
                <h3>Our website</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </div>
            <div className="footer__category__col">
                <h3>Service</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </div>
            <div className="footer__category__col">
                <h3>Contact</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </div>
        </div>
        <div className="footer__policy">
            <p>2022 by khanhduy74105</p>
            <ul className="footer__policy__social">
                <li><a href="/"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="/"><i className="fa-brands fa-google"></i></a></li>
                <li><a href="/"><i className="fa-brands fa-github"></i></a></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer