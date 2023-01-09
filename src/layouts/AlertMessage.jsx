
const AlertMessage = (props) => {
    const {message} = props
  return (message?
    <div style={{color: 'red', textAlign: 'center',}}>{message}</div>:''
  )
}

export default AlertMessage