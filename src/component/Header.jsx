import { useState } from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CurrencytoState } from '../Currencycontext';
import { Routes, Route, Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import { BsFillCartFill,BsSearch,BsXLg } from "react-icons/bs";
import { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import 'bootstrap/dist/js/bootstrap';
export default function Header()
{
 let {symbol,currency, setCurrency , cartItem, setCartItem,catLists} =  CurrencytoState();
 var total=0;
 const [isopen, setisopen] = useState(false);
 const [search, setSearch] = useState('');
 const [loading, setLoading] = useState(true);
 const [searchProduct, setSearchProduct] = useState([]);
 const navigate = useNavigate();
 const removepro = (id)=>{
   const updatecart = cartItem.filter((citem)=>{
    return citem.id !== id;
   });
   setCartItem(updatecart);
 }
 const handleNavigate = (id)=>{
  console.log(id);
  
  navigate(`/${id}`);
  // <Navigate to={"/" + id} replace={true} />
 }
 useEffect(()=>{
  setLoading(true);
 axios.get(`https://fakestoreapi.com/products`).then((data)=>{
   // console.log(data.data);
   setSearchProduct((data.data).filter((prod)=>{
    return prod.title.toLowerCase().includes(search);
   }))
   setLoading(false);
   
  }).catch((err)=>{
     console.log(err);
  })
 },[search]);
 const handleLogout = ()=>{
  sessionStorage.removeItem('Auth Token');
  signOut(auth).then(() => {
    navigate('/account'); 
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
  
 }
    return (
        <>
    
    <nav className='p-3'>
      <div className='container'>
      <div className='row'>
        <div className='col-md-4 col-xs-6 position-relative' onClick={()=>{setisopen(true)}}><span style={{fontSize:'30px'}}>{<BsFillCartFill />}</span><span className='position-absolute top-10 start-15 translate-middle badge rounded-pill bg-secondary'>{cartItem.length > 0 ? cartItem.length : "0"}</span></div>
        <section className='minicart p-3' style={{display:isopen ? "block" : "none",maxWidth:'350px'}}>
          <div onClick={()=>{setisopen(!isopen)}} className='p-2 text-right d-flex justify-content-end position-absolute top-0 end-0'>{<BsXLg />}</div>
            { cartItem.length > 0 &&
               <ul style={{maxHeight:'280px',scrollBehavior:'smooth',overflowY:'scroll'}}>
              {
                cartItem.map((item)=>{
                  total = total + parseFloat(item.price*item.qty);
                  return  <li key={item.id}><span onClick={()=>{removepro(item.id)}}><small>{<BsXLg />}{"  "}</small></span>
                  <span>
                    <img style={{"width":"60px","height":"60px"}} src={item.image} />
                    </span>{(item.title).slice(0,13)}{item.title.length>20?'...':''} × {item.qty}<span><strong>  {symbol}{  (item.price*item.qty).toFixed(2)}  </strong></span></li>
                })
              }
             </ul>
             
            }
             <div className='Total-mini-cart d-flex justify-content-between'><span>{cartItem.length>0 ? 'Total':"No cart item found" }</span><strong>{cartItem.length>0 ? ` ${symbol}${total.toFixed(2)}`:""}</strong></div>
              <div className='text-center p-2'><Link className='btn btn-dark' to="/cart">View Cart</Link></div>
             </section>
        <div className='col-md-4 col-xs-6'><h4 style={{fontSize:'40px',fontFamily: 'Rubik Gemstones'}} className='text-center'><Link to='/' style={{'textDecoration':'none'}} className='text-dark'><i>MY STORE</i></Link></h4></div>
        <div className='col-md-4 col-sm-12 col-xs-12'>
       
      <span className='d-flex'><input className="form-control mr-sm-2" value={search} type="search" placeholder="Search Product" onChange={(e)=>{setSearch(e.target.value)}}/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{<BsSearch />}</button></span>
      
       
        {search &&
        <div  className='searchfilter-sec p-2 text-right  position-absolute top-10 end-0'>
        
        <div className="row text-center">
          <div className='col-12'>
            {
                loading  && 
                (<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            }
            </div>
         </div>
         <ul className='row'>
        {
            searchProduct.map((pro)=>{
              return <li className='p-2 col-4' ke={pro.id}><a href={"/" + pro.id} style={{color:'#000000','textDecoration':'none'}}  ><span>
                <img className='image-fluid p-1' style={{width:'60px',height:'60px'}} src={pro.image} />
                </span><span>{(pro.title).slice(0,25)}...</span></a></li>
            })
          }
         
          
          </ul>
      
       </div>}
  
    </div>
      </div>
      </div>
    </nav>
    <div>
      <div style={{padding:'4px 0px',borderTop:'1px solid #000000',borderBottom:'1px solid #00000'}} className='container d-flex justify-content-center top-nav-bar'>
      <nav><select value={currency}  onChange={(e)=>{setCurrency(e.target.value)}}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select></nav>
          
      
      <nav className='p-2'><Link to="/">Home</Link></nav>
      <nav className='p-2'><Link to="/shop">Products</Link></nav>
      <nav className='p-2'><Link to="#">About</Link></nav>
      <nav className='p-2'><Link  to="/account">My Account</Link></nav>
      {auth.currentUser &&
      <nav className='p-2'><button className='btn btn-danger' onClick={handleLogout}>Logout</button></nav>}

      </div>
    </div>
        </>
    )
}