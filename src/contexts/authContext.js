import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN } from './constan'
import { createContext } from 'react'
import setAuthToken from '../utils/setAuthToken'
import { useEffect } from 'react'
import { setAuth } from '../redux/authSlice' 
import { useDispatch } from 'react-redux'
import { useState } from 'react'
export const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
    const [toast, setToast] = useState(null)
    const dispatch = useDispatch()
    const loadUser= async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN])
            try {
                const res = await axios.get(`${apiUrl}/auth`)
                if (res.data.success) {
                    dispatch(setAuth(res.data.user))
                }else{
                    console.log(res.data);
                }
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN)
                setAuthToken(null)
            }
        }

    }

    useEffect(()=>{
        loadUser()
    },[])

    const loginUser = async loginData =>{
        try {
            const res = await axios.post(`${apiUrl}/auth/login`,loginData)
            if (res.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.accessToken)
            }
            await loadUser()
            return res.data
        } catch (error) {
            if (error.response.data) return error.response.data
            return {success: false, message: error.message}
        }
    }

    const registerUser = async registerData =>{
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, registerData)
            if (res.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.accessToken)
            }
            await loadUser()
            return res.data
        } catch (error) {
            if (error.response.data) return error.response.data
            return {success: false, message: error.message}
        }
    }

    const authContextData = {
        loginUser,
        loadUser,
        toast,
        setToast,
        registerUser
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider