import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiUrl } from "../../../../contexts/constan";
import { AuthContext } from "../../../../contexts/authContext";
import "./manageOrders.scss";
const ManageOrders = ({ ordersOption }) => {
  const {setToast} = useContext(AuthContext)
  const [orders, setOrders] = useState(null);
  const getOrders = async () => {
    const res = await axios.get(`${apiUrl}/admin/orders/get`);
    if (res.data.success) {
      setOrders(res.data.orders);
      console.log(res.data.orders);
    }
  };
  const confirmOrder = async (e,id)=>{
    try {
      const res = await axios.post(`${apiUrl}/admin/order/confirm/${id}`)
      console.log(res.data);
      if (res.data.success) {
        setToast(res.data)
        getOrders()
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="orders__layout">
      <h3>ManageOrders</h3>
      <h4>{ordersOption}</h4>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Receiver</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Confirm</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => {
                return order.state === ordersOption &&(
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.receiver}</td>
                    <td>
                      <div className="order__products">
                        
                            <span>{order.order.length} Items</span>
                            <span onClick={e => {
                                e.target.innerText = e.target.innerText === 'View' ? 'Hide' : 'View'
                                const products = e.target.parentNode.querySelector('.order__view')
                                products.classList.toggle('show')
                            }}>View</span>
                        
                        <div className="order__view">
                          <table>
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Quanlity</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.order.map((prd, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{prd.name}</td>
                                    <td>{prd.quanlity}</td>
                                    <td>{prd.price}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                    <td>{order.total || 0}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.state === 'waiting' ?<button className="btn" onClick={e => confirmOrder(e, order._id)}>Confirm</button> : '---'}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
