import { Routes, Route } from 'react-router-dom';
import './App.scss'
import NavNUI from './components/nav';
import HomePage from './views/home';
import Footer from './components/footer';
import PokemonList from './views/product-list';
import Login from './views/login';
import ProductDetails from './views/product-details';
import ShoppingCart from './views/shopping-cart';
import ProtectedRoute from './components/protected-route';
import PageNotFound from './components/page-not-found';
import ScrollToTop from './components/scroll-to-top';
import { RecoilRoot } from 'recoil';
import Checkout from './views/checkout';
import AdminHome from './views/admin';
import AdminOrders from './views/admin-orders';
import AdminProducts from './views/admin-products';
import SignUp from './views/signup';
import Wishlist from './views/wishlist';
import UserOrders from './views/user-orders';
import ProtectedRouteAdmi from './components/protected-route-admi';


function App() {

  return (
    <>
      <ScrollToTop />
      <RecoilRoot>
        <NavNUI />
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/PokemonList' Component={PokemonList} />
          <Route path="/ProductDetails/:id" Component={ProductDetails} />
          <Route path='/Login' Component={Login} />
          <Route path='/SignUp' Component={SignUp} />
          <Route element={<ProtectedRoute />}>
            <Route path='/ShoppingCart' Component={ShoppingCart} />
            <Route path='/Checkout' Component={Checkout} />
            <Route path='/Wishlist' Component={Wishlist} />
            <Route path='/Orders' Component={UserOrders} />
          </Route>
          <Route element={<ProtectedRouteAdmi />}>
            <Route path='/AdminHome' Component={AdminHome} />
            <Route path='/AdminOrders' Component={AdminOrders} />
            <Route path='/AdminProducts' Component={AdminProducts} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </RecoilRoot>
      <Footer />
    </>
  )
}

export default App
