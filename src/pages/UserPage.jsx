import React, { useLayoutEffect, useState } from 'react'
import './userpage.scss'
import { useSelector } from 'react-redux'
import Footer from '../components/footer/Footer'
import Header from '../layouts/header/Header'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import { apiUrl } from '../contexts/constan'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'
import { useEffect } from 'react'

const UserPage = () => {
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    const [openChangePass, setOpenChangePass]= useState(false)
    const { user } = useSelector(state => state.auth)
    const {setToast, toast} = useContext(AuthContext)
    const schema = yup.object().shape({
        username: yup.string(),
        phone: yup.string('Phone number must be correct').matches(phoneRegExp,'Phone number format is wrong'),
        address: yup.string('Address must be correct'),
      });
      const schema1 = yup.object().shape({
        oldpass: yup.string('old password must be correct').required('Password is required'),
        newpassword: yup.string().required('New password is required').min(6, '6 characters at least'),
        confirmnewpassword: yup.string().oneOf([yup.ref('newpassword'), null], 'Passwords must match')
      });
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        // mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            username: user.username
          }
      });
      const {
        register: register1,
        formState: { errors: errors1 },
        handleSubmit: handleSubmit1,
      } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema1),
        defaultValues: {
            username: user.username
          }
      });
    const [leftBehavior, setLeftBehavior] = useState('order')
    const [orders, setOrders] = useState(null)
    const [orderType, setOrderType] = useState('all')
    const changeBehavior = (e)=>{
        setLeftBehavior(e.target.getAttribute('be-type'))
    }
    const onSubmit =async (data)=>{
        try {
            const res = await axios.post(`${apiUrl}/user/changeinfo`, data)
            if (res.data.success) {
                setToast({success: res.data.success,message: res.data.message})
            }else{
                setToast({success: res.data.success,message: res.data.message})
            }
        } catch (error) {
            
        }
    }
    const onSubmit1 = async (data)=>{
        try {
            const res = await axios.post(`${apiUrl}/user/changepass`, data)
            if (res.data.success) {
                setToast({success: res.data.success,message: res.data.message})
            }else{
                setToast({success: res.data.success,message: res.data.message})
            }
        } catch (error) {
            
        }
    }
    const changeAvt =async (e)=>{
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        try {
            const res = await axios.post(`${apiUrl}/user/changeavt`, formData);
            setToast(res.data)
        } catch (error) {
            
        }
    }
    const changeState =async (id, state)=>{
        try {
            const res = await axios.post(`${apiUrl}/order/changestate/${id}`,{state: state})
            if (res.data.success) {
                const getOrders = async ()=>{
                    const res = await axios.get(`${apiUrl}/cart/getorders`)
                    if (res.data.success) {
                        setOrders(res.data.orders)
                    }
                }
                getOrders()
                setToast({success: true, message: res.data.message})
            }
        } catch (error) {
            
        }
    }
    useLayoutEffect(()=>{
        const getOrders = async ()=>{
            const res = await axios.get(`${apiUrl}/cart/getorders`)
            if (res.data.success) {
                setOrders(res.data.orders)
            }
        }
        getOrders()
    }, [toast])
  return (
    <>
        <Header fixed={true}/>
        <div className="userpage">
            <div className="userpage__leftside">
                <div className="user__container">
                    <div className="user__container__img">
                        <img src={`${apiUrl}/${user.avatar}`} alt="" />
                        <div className="changeimg__layout">
                            <label htmlFor="userimg__input">
                                <i className="fa-regular fa-image"></i>
                            </label>
                            <input style={{display: 'none'}} type="file" id='userimg__input' accept="image/*" onChange={(e)=>{changeAvt(e)}}/>
                        </div>
                    </div>
                    <div>
                        <h3>{user.name}</h3>
                        <h3>{user.username}</h3>
                    </div>
                </div>
                    <ul className="user__behavior">
                        <li be-type='info' onClick={(e)=>changeBehavior(e)} className={leftBehavior === 'info' ? 'active':''} ><i className="fa-solid fa-user"></i>Infomation</li>
                        <li be-type='order' onClick={(e)=>changeBehavior(e)} className={leftBehavior === 'order' ? 'active':''} ><i className="fa-solid fa-receipt"></i>Your order</li>
                        <li be-type='favorite' onClick={(e)=>changeBehavior(e)} className={leftBehavior === 'favorite' ? 'active':''} ><i className="fa-solid fa-bookmark"></i>Your favorite products</li>
                    </ul>
            </div>
            <div className="userpage__rightside">
                <div className={`userpage__rightside__infomation`} style={{display: leftBehavior ==='info' ? 'block' : 'none'}}>
                    <div className="info__header">
                        <h4>Change your infomation</h4>
                        <p><i>Manage your information and account correctly</i></p>
                    </div>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__group">
                            <label htmlFor="">Username: </label>
                            <input type="text" disabled value={user.username}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">Phone: </label>
                            <input type="text" defaultValue={user.phone} name='phone' {...register('phone')}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">Address: </label>
                            <input type="text" defaultValue={user.address} name='address' {...register('address')}/>
                        </div>
                        <div className="handle__errors">
                            <p>{ errors.username?.message}</p>
                            <p>{ errors.address?.message}</p>
                            <p>{ errors.phone?.message}</p>
                        </div>
                        <button className="btn">Save</button>
                    </form>
                    <div className="info__header">
                        <p><i>Change your password ?</i> <span onClick={()=>{setOpenChangePass(state => !state)}}>{openChangePass ? 'Close':'Change'}</span></p>
                    </div>
                    <form style={{display: openChangePass ? 'block' : 'none'}} action="" onSubmit={handleSubmit1(onSubmit1)}>
                        <div className="form__group">
                            <label htmlFor="">Current Password: </label>
                            <input type="password" name='oldpass' {...register1('oldpass')}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">New Password: </label>
                            <input type="password" name='newpassword' {...register1('newpassword')}/>
                        </div>
                        <div className="form__group">
                            <label htmlFor="">Confirm Password: </label>
                            <input type="password" name='confirmnewpassword' {...register1('confirmnewpassword')}/>
                        </div>
                        <div className="handle__errors">
                            <p>{ errors1.oldpass?.message}</p>
                            <p>{ errors1.newpassword?.message}</p>
                            <p>{ errors1.confirmnewpassword?.message}</p>
                        </div>
                        <button className='btn' type='submit'>Save</button>
                    </form>
                </div>
                <div className={`userpage__rightside__order`} style={{display: leftBehavior ==='order' ? 'block' : 'none'}}>
                    <ul className="order__controll">
                        <li onClick={()=>setOrderType('all')} className={orderType ==='all' ? 'active': ''}>All</li>
                        <li onClick={()=>setOrderType('waiting') } className={orderType ==='waiting' ? 'active': ''}>Waiting</li>
                        <li onClick={()=>setOrderType('confirmed')} className={orderType ==='confirmed' ? 'active': ''}>Confirmed</li>
                        <li onClick={()=>setOrderType('canceled')} className={orderType ==='canceled' ? 'active': ''}>Canceled</li>
                        <li onClick={()=>setOrderType('done')} className={orderType ==='done' ? 'active': ''}>Done</li>
                    </ul>
                    <div className="order__container">
                        {orders && orders.map((order, idx) => {
                            const detail = (
                                <div className={`order__container__detail ${order.state}`} key={idx}>
                                    <h4>Order at {order.createdAt}</h4>
                                    <div className={`order__container__detail__layout `}>
                                        <div>Name</div>
                                        <div>Quanlity</div>
                                        <div>Price</div>
                                        {order.order.map(a => {return (<>
                                            <div>{a.name}</div>
                                            <div>{a.quanlity}</div>
                                            <div>{a.price}</div>
                                        </>)})}
                                    </div>
                                    <div>
                                        <p>Total: {order.total || 0}</p>
                                        {order.state === 'canceled' ? <>
                                            <h3>This order have been canceled</h3>
                                                <button className='btn' onClick={()=>{changeState(order._id, 'waiting')}}>Repurchase</button>
                                            </> : ''}
                                        {order.state === 'waiting' ? <button className='btn' onClick={()=>{changeState(order._id, 'canceled')}}>Cancel</button> : ''}
                                        {order.state === 'confirmed' ? <button className='btn' onClick={()=>{changeState(order._id, 'done')}}>Confirmed</button> : ''}
                                    </div>
                                </div>)
                            return orderType ==='all' ? detail : orderType === order.state ? detail : ''
                        })}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default UserPage