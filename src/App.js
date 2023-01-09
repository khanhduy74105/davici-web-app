import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import AuthContextProvider from './contexts/authContext';
import {Provider} from 'react-redux'
import store from './redux/store';
import ProtectRoute from './pages/ProtectRoute';
import AdminSite from './pages/AdminSite';
import Shop from './pages/Shop';
import ToastMess from './components/toastmessage/ToastMess';
import ProductDetail from './components/ProductDetail/ProductDetail';
import './App.scss';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import Cart from "./pages/Cart";
import UserPage from "./pages/UserPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {

  return (
    
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/cart' element={<ProtectRoute element={<Cart />}/>}/>
            <Route path='/user' element={<ProtectRoute element={<UserPage />}/>}/>
            <Route path='/shop/:productid' element={<ProductDetail />}/>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path='/login' element={<ProtectRoute />}/>
            <Route path='/admin' element={<AdminSite />}/>
          </Routes>
        </BrowserRouter>
        <ToastMess />
      </AuthContextProvider>

    </Provider>
  );
}

export default App;
