import './dashboard.scss'
import AdminAdd from "./adminsite/adminadd/AdminAdd";
import { useState } from "react";
import { LOCAL_STORAGE_TOKEN } from "../../contexts/constan.js";
import { setLogout } from "../../redux/authSlice.js";
import { useDispatch } from "react-redux";
import setAuthToken from '../../utils/setAuthToken.js'
import AdminControl from './adminsite/adminDelete/AdminControl';
import Edit from './adminsite/adminDelete/Edit';
import ManageOrders from './adminsite/adminorder/ManageOrders';
const Dashboard = () => {
    const [option, setOption] = useState('order')
    const handleClick = (e)=>{
      setOption(e.target.getAttribute('data'));
    }
    const dispatch = useDispatch()
    const handleLogout = ()=>{
      dispatch(setLogout())
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
      setAuthToken(null)
    }
    const [editOpen, setEditOpen] = useState(false)
    const [editData, setEditData] = useState({})
    const [ordersOption, setOrdersOption] = useState('waiting')
    const handleOrders = (e)=>{
      setOrdersOption(e.target.getAttribute('data'))
    }
  return (
    <div className='dashboard'>
      <div className="dashboard__options">
        <div>
          <h1>Adminad</h1>
          <span onClick={handleLogout}>Logout</span>
        </div>
        <ul>
          <li onClick={handleClick} data='add' className={option==='add' ? 'active' :''}>Add product</li>
          <li onClick={handleClick} data='control' className={option==='control' ? 'active' :''}>Delete</li>
          <li onClick={handleClick} data='order' >Orders
            <ul style={{display: option ==='order' ? 'block' : 'none'}} onClick={e => e.stopPropagation()}>
              <li data='waiting' className={ordersOption ==='waiting' ? 'active' :'' } onClick={handleOrders}>Need confirmed</li>
              <li data='done' className={ordersOption ==='done' ? 'active' :''} onClick={handleOrders}>Confirmed</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="dashboard__content">
        {option === 'add' && <AdminAdd />}
        {option === 'control' && <AdminControl  setEditOpen={setEditOpen} setEditData={setEditData}/>}
        {option === 'order' && <ManageOrders ordersOption={ordersOption}/>}
      </div>

      {editOpen && <Edit editOpen={editOpen} editData={editData} setEditOpen={setEditOpen}/>}
    </div>
  )
}

export default Dashboard