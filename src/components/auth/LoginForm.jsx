import './login.scss'
import {logo} from '../../assets/images.js'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../../layouts/AlertMessage'
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useEffect } from 'react'
const LoginForm = () => {
    const schema = yup.object().shape({
        username: yup.string().required("username is require").min('6',"username min length is 6"),
        password: yup.string().required("password is require"),
    })
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const {loginUser} = useContext(AuthContext)
    const [userData, setUserData] = useState({
        username:'',
        password:''
    })
    const [alert, setAlert] = useState(null)
    useEffect(()=>{
        setAlert(null)
    },[])
    const handleChange = (e)=>{
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    const onSubmit = async (data)=>{
        try {
            const loginDataRes = await loginUser(data)
            if (!loginDataRes.success) {
                
                setAlert(loginDataRes.message)
                setTimeout(() => {
                    setAlert(null)
                }, 3000);
            }
        } catch (error) {
            setAlert('Error')
        }
    }
  return (
    <div className='center-container'>
        <img src={logo} alt="" />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <p>
                <label htmlFor="">User Name</label>
                <input type="text" name='username' onChange={handleChange} {...register("username")}/>
            </p>
                <span style={{dispaly:'block', fontSize:'12px', color: 'red', textAlign:'right'}}>{errors.username?.message}</span>
            <p>
                <label htmlFor="">Password</label>
                <input type="password" name='password' onChange={handleChange} {...register("password")}/>
            </p>
                <span style={{dispaly:'block', fontSize:'12px', color: 'red', textAlign:' right'}}>{errors.password?.message}</span>
            {alert? (<AlertMessage message={alert}/>):'' }
            <div>Dont have account? <a href="/">Register</a></div>
            <button type='submit'>Login</button>
        </form>

    </div>
  )
}

export default LoginForm