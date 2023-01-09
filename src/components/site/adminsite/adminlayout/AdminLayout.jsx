import React from 'react'
import './adminlayout.scss'
const AdminLayout = ({children}) => {
  return (
    <div className='adminlayout'>
        {children}
    </div>
  )
}

export default AdminLayout