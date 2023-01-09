import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import { apiUrl } from '../../contexts/constan'
import Product from '../product/Product'
import './newArrival.scss'
const NewArrival = () => {
  const [products, setProducts] = useState({
    isLoading: true,
    data: null
  })
    const getProducts =async ()=>{
        const res = await axios.get(`${apiUrl}/getproduct`)
        setProducts({isLoading: false,data:res.data.data})
    }
    useLayoutEffect(()=>{
        getProducts()
    },[])
  return (
    <div className='arrivals'>
        <div className='title'>
            <h3>new arrivals</h3>
        </div>

        <div className="layout__product">
          {products.isLoading ? <h6>Loading....</h6> : products.data.map((product, index)=>{
              return <Product data = {product} key={index}/>
            })}
        </div>
    </div>
  )
}

export default NewArrival