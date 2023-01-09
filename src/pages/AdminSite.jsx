import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Dashboard from '../components/site/Dashboard'

const AdminSite = () => {
    const {isAuthenticate, user} = useSelector(state => state.auth)
    let AdminSite = <Dashboard />
    if (user && user.role !== 'admin') {
        AdminSite = <Navigate to='/' />
    }
    if (!isAuthenticate) {
        AdminSite = <Navigate to='/' />
    }
    return AdminSite
  
}

export default AdminSite