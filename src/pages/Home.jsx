import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Branchs from "../components/branchs/Branchs"
import FlashDeal from "../components/flashDeal/FlashDeal"
import Footer from "../components/footer/Footer"
import NewArrival from "../components/newArrival/NewArrival"
import SalePic from "../components/sale/SalePic"
import BannerSection from "../components/section/BannerSection"
import ToastMess from "../components/toastmessage/ToastMess"
import Header from "../layouts/header/Header"

const Home = () => {
  const {isAuthenticate, user} = useSelector(state => state.auth)
  console.log(user);
  let Home
  Home =(
    <>
        <Header />
        <div style={{height: '100vh', overflow:'hidden'}}>
          <BannerSection />
        </div>
        <SalePic />
        <NewArrival />
        <FlashDeal />
        <Branchs />
        <Footer />
    </>
  )
  if (user && user.role === 'admin') {
    return <Navigate to='/admin' />
  }
  return (
    Home
  )
}

export default Home