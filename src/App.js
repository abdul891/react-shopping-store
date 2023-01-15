import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Productlist from './component/Productlist';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import ProductDetails from './component/ProductDetails';
import Todolist from './component/todo/Todolist';
import Cart from './component/Cart';
import ProductCategory from './component/ProductCategory';
import Products from './component/Products';
import Home from './component/Home';
import Footer from './component/Footer';
import Account from './component/Account';
import Singup from './component/Signup';
import Login from './component/Login';
function App() {

  return (
    <>
    
    <Header />
    
    <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/:Id" element={<ProductDetails />} />
        <Route path='/shop' element={<Products />} />
        <Route path='/category=:cat' element={<ProductCategory />} />
        <Route path='/todolist' element={<Todolist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account' element={<Account />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
