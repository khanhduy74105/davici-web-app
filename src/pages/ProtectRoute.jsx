import { useSelector } from "react-redux"
import { Navigate} from 'react-router-dom'
import LoginForm from "../components/auth/LoginForm"

const ProtectRoute = (props) => {
    const {isAuthenticate, user} = useSelector(state => state.auth)
    const {element} = props
    let result
    if (isAuthenticate && user.role === 'admin') {
        result = <Navigate to="/admin" />
    }else if (isAuthenticate && user.role === null) {
        result = element || <Navigate to='/' />
    }else{
        result = <LoginForm />
    }
    return result
}

export default ProtectRoute