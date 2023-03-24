import { hourbg } from '../../assets/images'
import './flashdeal.scss'
const FlashDeal = () => {
  return (
    <div className='flashdeal' style={{backgroundImage: `url(${hourbg})`}}>
        <div className="title-side">
            <span className="material-symbols-outlined">
            percent
            </span>
            <p>flash deal</p>
        </div> 
        <div className="flashdeal__content">
            <h3>Alarm clock</h3>
            <h5>300$</h5>
            <div className="">
                <p>This is best sale of year</p>
                |
                <div className="hour-counter">12 2020</div>
            </div>
            <div>
                <a href="/shop">Shop now</a>
            </div>
        </div>
    </div>
  )
}

export default FlashDeal