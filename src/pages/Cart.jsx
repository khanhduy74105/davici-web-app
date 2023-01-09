import Footer from "../components/footer/Footer"
import UserCart from "../components/section/UserCart"
import Header from "../layouts/header/Header"

const Cart = () => {
  return (
    <>
        <Header fixed={true}/>
        <UserCart />
        <Footer />
    </>
  )
}

export default Cart