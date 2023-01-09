import axios from "axios";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { apiUrl } from "../../contexts/constan";
import { AuthContext } from "../../contexts/authContext";
import "./usercart.scss";
const UserCart = () => {
  const {setToast} = useContext(AuthContext)
  const [openCheckout, setOpenCheckout]= useState(false)
  const [checkoutData , setCheckoutData]= useState({
    receiver: null,
    address: null,
    phone: null,
    email: null,
    order: null,
    total: null
  })
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const [productsInCart, setProductsInCart] = useState({
    products: null,
    amountPrice: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [warningMess, setWarningMess] = useState(false)
  const getProductsInCart = async () => {
    try {
      if (isAuthenticate) {
        const res = await axios.get(`${apiUrl}/cart/get`);
        const arr = res.data.product.map((item) => {
          return { ...item.product, quanlity: item.quanlity || 1 };
        });
        const total = arr.reduce((total, curItem) => {
          return total + curItem.price * curItem.quanlity;
        }, 0);
        setTotalPrice(total);
        setProductsInCart({
          ...productsInCart,
          products: arr,
          amountPrice: total,
        });

      }
    } catch (error) {}
  };
  useLayoutEffect(() => {
    getProductsInCart();
    handleAddress()
  }, [openCheckout]);
  const handleChange =(e)=>{
    setCheckoutData({...checkoutData, [e.target.name]: e.target.value})
  }
  useEffect(()=>{
    if (productsInCart.products) {
      const products = productsInCart.products.map(prd => {
        const {_id, name, price, quanlity} = prd
        return {_id, name, price, quanlity}
      })
      setCheckoutData(state=>{
        return {...state, order: products}
      });
    }
  },[productsInCart])
  const handleAddress =async ()=>{
    const citis = document.getElementById('address__city')
    const districts = document.getElementById("address__district");
    const wards = document.getElementById("address__ward");
    await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then(res => res.json())
      .then(data => {
        for (const city of data) {
          citis.options[citis.options.length] = new Option(city.Name, city.Id);
        }
        citis.addEventListener('change', function(){
          districts.length = 1;
          wards.length = 1;
          if(this.value != ""){
            const result = data.filter(n => n.Id === this.value);
            this.name = result[0].Name
            for (const k of result[0].Districts) {
              districts.options[districts.options.length] = new Option(k.Name, k.Id);
            }
          }
        })
        districts.addEventListener('change', function(){
          wards.length = 1;
          const dataCity = data.filter((n) => n.Id === citis.value);
          if (this.value !='') {
            const dataWard = dataCity[0].Districts.filter((n) => n.Id ===this.value)[0].Wards
            this.name = dataCity[0].Districts.filter((n) => n.Id ===this.value)[0].Name
            for (const ward of dataWard) {
              wards.options[wards.options.length] =new Option(ward.Name, ward.Name)
            }
          }
        })
        wards.addEventListener('change', function(){
          const address = this.value + ' - ' + districts.name + ' - '+ citis.name
          setCheckoutData(state => {
            return {...state, address: address}
          },
          )
          
        })
      })
  }
  const handleSumit = e =>{
    if ((checkoutData.receiver === null || checkoutData.receiver === '') 
    || (checkoutData.address === null ||checkoutData.address === '') 
    || (checkoutData.phone === null || checkoutData.phone ==='') 
    || (checkoutData.email === null || checkoutData.email === '') 
    ||( checkoutData.order === null || checkoutData.order === '' )) {
      setWarningMess(true)
      setTimeout(() => {
        setWarningMess(false)
      }, 3000);
    }else{
      submitData()
    }
  }
  const submitData =async () =>{
    try {
      const res = await axios.post(`${apiUrl}/user/makeorder`, {...checkoutData, total: totalPrice})
      if (res.data.success) {
        setOpenCheckout(false);
        setToast(res.data)
      }else{
        setToast(res.data)
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="usercart">
      <h1>Cart</h1>
      <h4>
        Total{" "}
        <span>{productsInCart.products && productsInCart.products.length}</span>{" "}
        products
      </h4>
      <table className="usercart__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quanlity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productsInCart.products &&
            productsInCart.products.map((product, index) => {
              const increase = () => {
                ++product.quanlity;
                document.querySelector(
                  `.quanlity__ctrl__quanlity[prdid='${product._id}']`
                ).innerText = product.quanlity;
                document.querySelector(
                  `.product__total[prdid='${product._id}']`
                ).innerText = product.quanlity * product.price;
                setTotalPrice(
                  productsInCart.products.reduce(
                    (total, prd) => total + prd.price * prd.quanlity,
                    0
                  )
                );
                setProductsInCart(state => {
                    return {...state, amountPrice: productsInCart.products.reduce(
                        (total, prd) => total + prd.price * prd.quanlity,
                        0
                      )}
                })
              };
              const decrease = () => {
                if (product.quanlity > 1) {
                  document.querySelector(
                    `.quanlity__ctrl__quanlity[prdid='${product._id}']`
                  ).innerText = --product.quanlity;
                  document.querySelector(
                    `.product__total[prdid='${product._id}']`
                  ).innerText = product.quanlity * product.price;
                  setTotalPrice(
                    productsInCart.products.reduce(
                      (total, prd) => total + prd.price * prd.quanlity,
                      0
                    )
                  );
                  setProductsInCart(state => {
                    return {...state, amountPrice: productsInCart.products.reduce(
                        (total, prd) => total + prd.price * prd.quanlity,
                        0
                      )}
                })
                }
              };
              return (
                <tr key={index}>
                  <td>
                    <a href={`/shop/${product._id}`} className="td__name">
                      {product.name}
                    </a>
                  </td>
                  <td className="td__img">
                    <img src={`${apiUrl}/${product.images[0]}`} alt="" />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="quanlity__ctrl">
                      <button className="btn" onClick={() => decrease()}>
                        -
                      </button>
                      <span
                        className={`quanlity__ctrl__quanlity`}
                        prdid={product._id}
                      >
                        {product.quanlity}
                      </span>
                      <button className="btn" onClick={() => increase()}>
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product__total" prdid={product._id}>
                    {product.quanlity * product.price}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="usercart__total">
        <div>Total: {totalPrice}</div>
        <button
          className="btn"
          onClick={() => {
            setOpenCheckout(true)
          }}
        >
          Check out
        </button>
      </div>
      <div className="checkout__layout" onClick={(e)=>{
        setOpenCheckout(false);
      }} style={{display: openCheckout ? 'flex' : 'none'}}>
        <div className="cartcheckout" 
        onClick={(e)=>{
          e.stopPropagation()
        }}>
          <h2>Checkout</h2>
          <form className="cartcheckout__form">
            <div className="cartcheckout__form__group">
              <label htmlFor="">Receiver:</label>
              <input required type="text" name="receiver" onChange={(e)=>handleChange(e)}/>
            </div>
            <div className="cartcheckout__form__group">
              <label htmlFor="">Address:</label>
              <select defaultValue="" name="ss" id="address__city">
                <option>Select city</option>
              </select>
              <select defaultValue="" name="" id="address__district">
                <option>Select district</option>
              </select>
              <select defaultValue="" name="" id="address__ward">
                <option>Select ward</option>
              </select>
            </div>
            <div className="cartcheckout__form__group">
              <label htmlFor="">Phone number:</label>
              <input required type="text" name="phone" onChange={(e)=>handleChange(e)}/>
            </div>
            <div className="cartcheckout__form__group">
              <label htmlFor="">Email:</label>
              <input required type="email" name="email" onChange={(e)=>handleChange(e)}/>
            </div>
          </form>
          <p style={{color: 'red', display: warningMess ? 'block' : 'none'}} id="checkout__warning">Fill all field!</p>
          <table className="cartcheckout__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quanlity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            {productsInCart.products &&
              productsInCart.products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quanlity}</td>
                    <td>{product.quanlity * product.price}</td>
                  </tr>
                )
              })
            }
            <tr>
              <td colSpan={3}>Total order:</td>
              <td>{productsInCart.amountPrice} $</td>
            </tr>
            </tbody>
          </table>
          <button className="btn" onClick={(e)=>{
            handleSumit(e)
          }}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
