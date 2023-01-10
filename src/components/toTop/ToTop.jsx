import React from 'react'
import { useState } from 'react'
import './totop.scss'
const ToTop = () => {
    const [show, setShow] = useState(false)
    window.onscroll = function roll(){
        if (window.scrollY > 400) {
            setShow(true)
        }else{
            setShow(false)
        }
    }
    const onClick = (e)=>{
        const t = setInterval(() => {
            document.documentElement.scrollTop-=50
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(t)
            }
        }, 1);
    }

  return (
    <div id='totop' style={{display: show ? 'flex': ' none'}} onClick={onClick}>
        <span className="material-symbols-outlined">
            arrow_upward
        </span>
    </div>
  )
}

export default ToTop