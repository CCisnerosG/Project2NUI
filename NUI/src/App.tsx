import { Routes, Route } from 'react-router-dom';
import './App.scss'
import NavNUI from './components/nav';
import HomePage from './views/home';
import Footer from './components/footer';
import PokemonList from './views/product-list';
import Login from './views/login';
import ProductDetails from './views/product-details';
import ShoppingCart from './views/shopping-cart';

function App() {

  return (
    <>
      <NavNUI />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/PokemonList' Component={PokemonList} />
        <Route path="/ProductDetails/:id" Component={ProductDetails} />
        <Route path='/Login' Component={Login} />
        <Route path='/ShoppingCart' Component={ShoppingCart} />
        {/* <Route path='/Checkout' Component={Checkout} /> */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
