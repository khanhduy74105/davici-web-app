import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { logo } from '../../assets/images'
import AlertMessage from '../../layouts/AlertMessage'
import * as yup from 'yup'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../../contexts/constan'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
const RegisterForm = () => {
    const {registerUser} = useContext(AuthContext)
    const schema = yup.object().shape({
        username: yup.string().required("Username is require").min('6',"Username min length is 6"),
        password: yup.string().required("Password is require"),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    })
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const onRegister = async (data)=>{
        const registerData = {
            username: data.username,
            password: data.password
        }
        try {
            const res = await registerUser(registerData)
            if (res.success) {
                window.location.href = '/login';
            }
        } catch (error) {
            setAlert('Error')
        }
    }
    const [alert, setAlert] = useState('')
  return (
    <div className='center-container'>
        <img src={logo} alt="" />
        <form action="" onSubmit={handleSubmit(onRegister)}>
            <p>
                <label htmlFor="">User Name</label>
                <input type="text" name='username' {...register('username')}/>
            </p>
            <span style={{dispaly:'block', fontSize:'12px', color: 'red', textAlign:'right'}}>{errors.username?.message}</span>
            <p>
                <label htmlFor="">Password</label>
                <input type="password" name='password' {...register('password')}/>
            </p>
            <span style={{dispaly:'block', fontSize:'12px', color: 'red', textAlign:'right'}}>{errors.password?.message}</span>
            <p>
                <label htmlFor="">Confirm password</label>
                <input type="password" name='confirmpassword' {...register('confirmpassword')}/>
            </p>
            <span style={{dispaly:'block', fontSize:'12px', color: 'red', textAlign:'right'}}>{errors.confirmpassword?.message}</span>
            {alert ? <AlertMessage message={alert} /> : ''}
            <div>Already have an account ?<a href="/login">Sign in</a></div>
            <button type='submit'>Register</button>
        </form>

    </div>
  )
}

export default RegisterForm