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
import ProtectedRoute from './components/protected-route';
import Checkout from './components/checkout';


function App() {

  return (
    <>
      <NavNUI />
      <AuthProvider>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/PokemonList' Component={PokemonList} />
          <Route path="/ProductDetails/:id" Component={ProductDetails} />
          <Route path='/Login' Component={Login} />
          <Route element={<ProtectedRoute />}>
            <Route path='/ShoppingCart' element={<ShoppingCart />} />
          </Route>
          <Route path='/Checkout' element={<Checkout />} />
          {/* <Route path='/Checkout' Component={Checkout} /> */}
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  )
}

export default App
