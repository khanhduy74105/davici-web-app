import './banner.scss'
import { shopbanner } from '../../assets/images'
const Banner = () => {
  return (
    <div className='bannersite' style={{backgroundImage: `url(${shopbanner})`}}>
        <div className="bannersite__content">
            <h2>Shop</h2>
            <p><a href="/">Home</a>/ <a href="#">Shop</a></p>
        </div>
    </div>
  )
}

export default Banner