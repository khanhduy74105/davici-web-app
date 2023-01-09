import './product.scss'
import { apiUrl } from '../../contexts/constan'
import axios from 'axios'
import { useContext } from 'react'
import AuthContextProvider, { AuthContext } from '../../contexts/authContext'
import { useSelector } from 'react-redux'
const Product = (props) => {
    const {data} = props
    const {setToast} = useContext(AuthContext)
    const {isAuthenticated} = useSelector((state) => state.auth)
    const addToCart = async (id) =>{
        if (isAuthenticated) {
            try {
                const res = await axios.post(`${apiUrl}/cart/add/${id}`, {quanlity: 1})
                if (res.data.success) {
                    setToast({
                        success: true,
                        message: res.data.message || 'Action successfully'
                    })
                }else{
                    setToast({
                        success: false,
                        message: res.data.message || 'Failed action'
                    })
                }
            } catch (error) {
                
            }
        }else{
            window.location.href = '/login';
        }
    }
  return (
    <div className='product'>
        <div className="product__frame" style={{backgroundImage: `url(${apiUrl}/${data.images[0]})`}}>
            
            <div className="product__frame__see">
                <a href={`/shop/${data._id}`} >
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </a>
            </div>
            <div className="product__frame__actions">
                <a onClick={()=>addToCart(data._id)} title="Add to cart">
                    <span className="material-symbols-outlined">
                        local_mall
                    </span>
                </a>
                <a >
                    <span className="material-symbols-outlined" title="Add to your favorite store">
                        favorite
                    </span>
                </a>
            </div>
        </div>

        <div className="product__content">
                            <div className="rated">
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <div
                                  className="stars-rating"
                                  style={{
                                    width: `${(data.rate * 100) / 5}%`,
                                  }}
                                >
                                  <div>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                  </div>
                                </div>
                              </div>

            <a href={`/shop/${data._id}`}>{data.name}</a>

            <p className="price">{data.price} 
                <span className="material-symbols-outlined">
                    attach_money
                </span>
            </p>
        </div>
    </div>
  )
}

export default Product