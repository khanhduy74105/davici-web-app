import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import { apiUrl } from '../../contexts/constan'
import Product from '../product/Product'
import './productsshop.scss'

const ProductsShop = () => {
    const [categoryOpen, setCategoryOpen] = useState(true)
    const [range, setRange] = useState('1000')
    const [pages, setPages] = useState(null)
    const [curPage,setCurPage] = useState(1)
    const [products, setProducts] = useState({
        isLoading: true,
        data: null
      })
      const getProducts =async ()=>{
        const res = await axios.get(`${apiUrl}/getproductshop/${curPage}`)
        setProducts({isLoading: false, data:res.data.data})
        setPages(res.data.pages)
    }
    const renderPagination =(pages) =>{
        let list =[]
        for (let i = 1; i <= pages; i++) {
          list.push(i)
        }
        return list
      }
    useLayoutEffect(()=>{
        getProducts()
    },[curPage])
  return (
    <div className='shop'>
        <div className="shop__category">
            <h1 onClick={() => setCategoryOpen(state=>!state)}>category<i className={`fa-solid fa-angle-${categoryOpen ? 'up':'down'}`}></i></h1>
            <div className="shop__category__type" style={{display: categoryOpen ? 'block' :'none'}}>
                <h3>types</h3>
                <div className="shop__category__type__group">
                    <input type="checkbox" name="lamp" id="" value='lamp'/>
                    <label htmlFor="">lamp</label>
                </div>
                <div className="shop__category__type__group">
                    <input type="checkbox" name="chair" id="" value='chair'/>
                    <label htmlFor="">chair</label>
                </div>
                <div className="shop__category__type__group">
                    <input type="checkbox" name="table" id="" value='table'/>
                    <label htmlFor="">table</label>
                </div>
                <div className="shop__category__type__group">
                    <input type="checkbox" name="sofa" id="" value='sofa'/>
                    <label htmlFor="">sofa</label>
                </div>
            </div>
            <div className="shop__category__price" style={{display: categoryOpen ? 'block' :'none'}}>
                <h3>Price</h3>
                <input id='price__range' type="range" min='0' max='1000' step='1' onChange={e=>{setRange(e.target.value)}} defaultValue={range}/>
                <p>0 - {range} $</p>
                <button className='btn filter-btn'>get</button>
            </div>
        </div>
        <div className="shop__products">
            <div className="shop__products__container">
                {products.isLoading ? <h6>Loading....</h6> : products.data.map((product, index)=>{
                    return <Product data = {product} key={index} width={'25%'}/>
                    })}
            </div>
            <div className="pagination">
              <span data='1' onClick={()=>{
                    setCurPage(1)
                  }}>First</span>
              <ul>
                {
                  renderPagination(pages).map((cur,idx) => <li key={idx} onClick={()=>{
                    setCurPage(cur)
                    }} data={cur} className={curPage === cur?'active':''} style={{display: (cur <= curPage + 1 && cur >= curPage - 1) ? '':'none'}}>{cur}</li>)
                }
              </ul>
              <span data={pages} onClick={()=>{
                    setCurPage(pages)
                  }}>Last</span>
            </div>
        </div>
    </div>
  )
}

export default ProductsShop