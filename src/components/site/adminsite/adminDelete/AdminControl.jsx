import "./admincontrol.scss";
import AdminLayout from '../adminlayout/AdminLayout'
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../contexts/constan";

const AdminControl = (props) => {
  const {setEditOpen, setEditData}=props
  const [curPage, setCurPage] = useState(1)
  const [pages, setPages] = useState(null)
  const [products, setProducts] = useState([])
  const renderPagination =(pages) =>{
    let list =[]
    for (let i = 1; i <= pages; i++) {
      list.push(i)
    }
    return list
  }
  useLayoutEffect(()=>{
    const fetchProduct = async (page)=>{
      return await axios.get(`${apiUrl}/admin/get/${page}`)
    }
    try {
      fetchProduct(curPage) 
        .then(res=>{
          setPages(res.data.pages)
          setProducts(res.data.data)
        })
      } catch (error) {
        
      }
    }, [curPage])
  return (
    <AdminLayout>
        <div className="admincontrol">
            <table>
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th></th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => 
                  <tr key={index}>
                    <td>
                      <p>{product.name}</p>
                    </td>
                    <td>
                      <img src={`${apiUrl}/${product.images[0]}`} alt="" />
                    </td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.type}</td>
                    <td>
                      <button className="btn edit__button" onClick={()=>{
                        setEditOpen(true)  
                        setEditData(product)
                      }} >Edit</button>
                    </td>
                    <td>
                      <button className="btn delete__button" value={product._id}>Delete</button>
                    </td>
                  </tr>
                )}

               
              </tbody>
            </table>
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
    </AdminLayout>
  )
}

export default AdminControl