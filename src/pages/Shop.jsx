import React from 'react'
import Footer from '../components/footer/Footer'
import ProductsShop from '../components/productshop/ProductsShop'
import Banner from '../components/section/Banner'
import Header from '../layouts/header/Header'

const Shop = () => {
  return (
    <>
        <Header fixed={true}/>
        <Banner />
        <ProductsShop />
        <Footer />
    </>
  )
}

export default Shop