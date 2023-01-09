import { centerSale, leftSale, rightSale } from '../../assets/images'
import './salePic.scss'

const SalePic = () => {
  return (
    <div className='sale'>
        <div className="sale__item " style={{backgroundImage: `url(${leftSale})`}}>

            <div className="sale__item__content left">
                <h6>Hot product</h6>
                <h3>Long Chair</h3>
                <a href="">Shop now</a>
            </div>
        </div>
        <div className="sale__item" style={{backgroundImage: `url(${centerSale})`}}>

        </div>
        <div className="sale__item " style={{backgroundImage: `url(${rightSale})`}}>

            <div className="sale__item__content right">
                <h6>Hot product</h6>
                <h3>Long Chair</h3>
                <a href="">Shop now</a>
            </div>
        </div>
    </div>
  )
}

export default SalePic