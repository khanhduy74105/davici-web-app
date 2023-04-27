import { useContext, useState } from "react";
import { logo } from "../../assets/images.js";
import "./header.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/authSlice.js";
import setAuthToken from "../../utils/setAuthToken.js";
import { apiUrl, LOCAL_STORAGE_TOKEN } from "../../contexts/constan.js";
import { useLayoutEffect } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/authContext.js";
const Header = ({fixed}) => {
  const { toast} = useContext(AuthContext)
    const dispatch = useDispatch()
  const [accountClick, setAccountClick] = useState(false);
  const [scroll, setScroll] = useState(false)
  const onClick = () => {
    setAccountClick(!accountClick);
  };
  const { isAuthenticate, user } = useSelector(state => state.auth);
  const handleLogout = ()=>{
    localStorage.removeItem(LOCAL_STORAGE_TOKEN)
    setAuthToken(null)
    dispatch(setLogout())
  }
  window.addEventListener('scroll', ()=>{
    if (window.scrollY > 0) {
      setScroll(true)
    }else{
      setScroll(false)
    }
  })
  const [productsInCart, setProductsInCart] =useState({
    products: null,
    amountPrice: 0
  })
  const getProductsCart = async ()=>{
    try {
      if (isAuthenticate) {
        const res = await axios.get(`${apiUrl}/cart/get`)
        const total = res.data.product.reduce((total, curItem)=>{
          return total + curItem.product.price
        },0)
        setProductsInCart({...productsInCart, products: res.data.product, amountPrice: total});
      }
    } catch (error) {
      
    }
  }
  useLayoutEffect(()=>{
      getProductsCart()
      
  },[isAuthenticate,toast])


  const [openCart, setOpenCart] = useState(false)
  return (
    <div className="header" style={{backgroundImage: fixed ? `linear-gradient(90deg, rgba(229,185,152,1) 3%, rgba(240,229,221,1) 32%, rgba(254,224,168,1) 100%)` : scroll ? `linear-gradient(90deg, rgba(229,185,152,1) 3%, rgba(240,229,221,1) 32%, rgba(254,224,168,1) 100%)` : ''}}>
      <div className="header__inner container">
        <div className="header__logo">
          <img src={logo} alt="" />
        </div>
        <ul className="header__nav">
          <li>
            <a href="/">home</a>
          </li>
          <li>
            <a href="/shop">shop</a>
          </li>
          <li>
            <a href="/about">about</a>
          </li>
          <li>
            <a href="/contact">contact</a>
          </li>
        </ul>
        <div className="header__search">
          <form action="">
            <input type="text" />
            <button type="submit">
              <span className="material-symbols-outlined">search</span>
            </button>
          </form>
        </div>
        <div className="header__account">
          {isAuthenticate ? (
            <>
              <div className="header__account__cart">
                <a href="" onClick={(e)=>{
                  e.preventDefault()
                  setOpenCart(state => !state)
                }}>
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  <div>{productsInCart.products && productsInCart.products.length}</div>
                </a>
                <div className="header__account__cart__contain" style={{display: openCart ? 'block' : 'none'}}>
                  <h1>Total {productsInCart.products && productsInCart.products.length || 0} items</h1>
                  <div className="cart__items">
                        <h5>Name</h5>
                        <h5>Image</h5>
                        <h5>Price</h5>
                        <h5>Quanlity</h5>
                  </div>
                  {productsInCart.products && productsInCart.products.map((product, index)=> {
                    return (
                      <div className="cart__items" key={index}>
                        <h5>{product.product.name}</h5>
                        <img src={`${apiUrl}/${product.product.images[0]}`} alt="" />
                        <h5>{product.product.price}$</h5>
                        <h5>{product.quanlity || 1}</h5>
                      </div>
                    )
                  })}
                  {productsInCart.amountPrice && (<div>
                    Total:  {productsInCart.amountPrice}$
                  </div>)}
                  
                  <div className="to__usercart">
                      <a href="/cart">go to check out</a>
                  </div>
                </div>
              </div>

              <div className="header__account__user" onClick={onClick}>
                <img
                  src={`${apiUrl}/${user.avatar}` || `${user.avatar}`}
                  alt=""
                />
                <p>{user.username}</p>
                <ul
                  className={`header__account__user__actions ${
                    accountClick ? "active" : ""
                  }`}
                >
                  <li>
                    <a href="/user">Your Account</a>
                  </li>
                  <li>
                    <a href="" onClick={handleLogout}>
                      Log out
                      <span className="material-symbols-outlined">logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="header__account__login">
                <a href="/login">Login</a>
              </div>
              <div className="header__account__register">
                <a href="/register">Register</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
