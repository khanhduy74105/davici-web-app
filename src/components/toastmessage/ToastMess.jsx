import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import './toastmess.scss'
const ToastMess = () => {
    const {toast, setToast} = useContext(AuthContext)
    setTimeout(() => {
        setToast(null)
    }, 3000);
  return (
    <div className='toast' style={{backgroundColor : toast && toast.success ? 'green' : 'red', display: toast ? 'block' : 'none'}}>
        <h5>{toast && toast.success ? 'Success!' : 'Failed!'}</h5>
        <p>{toast && toast.message}</p>
    </div>
  )
}

export default ToastMess