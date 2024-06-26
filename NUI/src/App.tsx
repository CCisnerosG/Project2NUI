import { Routes, Route } from 'react-router-dom';
import './App.scss'
import NavNUI from './components/nav';
import HomePage from './views/home';
import Footer from './components/footer';
import PokemonList from './views/product-list';
import Login from './views/login';
import ProductDetails from './views/product-details';
import ShoppingCart from './views/shopping-cart';
import { AuthProvider } from './hooks/useAuth';
import Checkout from './components/checkout';
import ProtectedRoute from './components/protected-route';
import PageNotFound from './components/page-not-found';
import ScrollToTop from './components/scroll-to-top';
import {
  RecoilRoot,
} from 'recoil';


function App() {

  return (
    <>
      <ScrollToTop />
      <RecoilRoot>
        <NavNUI />
        <AuthProvider>
          <Routes>
            <Route path='/' Component={HomePage} />
            <Route path='/PokemonList' Component={PokemonList} />
            <Route path="/ProductDetails/:id" Component={ProductDetails} />
            <Route path='/Login' Component={Login} />
            <Route element={<ProtectedRoute />}>
              <Route path='/ShoppingCart' Component={ShoppingCart} />
              <Route path='/Checkout' Component={Checkout} />
            </Route>
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </AuthProvider>
      </RecoilRoot>
      <Footer />
    </>
  )
}

export default App
