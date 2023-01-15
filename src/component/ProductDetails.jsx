import { Routes, Route, useParams, json, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CurrencytoState } from '../Currencycontext';
import Rating from 'react-rating';
export default function ProductDetails()
{    let params = useParams();
    const [sigleProduct, setSigleProduct] = useState([]);
    const [singleQty, setSingleQty] = useState(1);
    const [loading, setLoading] = useState(true);
    let url = `https://fakestoreapi.com/products/${params.Id}`;
    let {symbol,currency, cartItem, setCartItem, addCart} = CurrencytoState();
    // let {currency, cartItem, setCartItem, addCart} = CurrencytoState();
    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${params.Id}`).then((data)=>{
         // console.log(data.data);
         setSigleProduct(data.data);
        setLoading(false);
        }).catch((err)=>{
           console.log(err);
        })
       },[])
       const AddtoCart = (prod)=>{
        if(cartItem.some((citem)=> citem.id === prod.id))
        {
          setCartItem((cart) =>
          cart.map((cartItem) =>
            cartItem.id === prod.id
              ? {
                  ...cartItem,
                  qty: cartItem.qty + parseInt(singleQty)
                }
              : cartItem
          )
        );
            return;
        }
        else
        {
          prod.qty= parseInt(singleQty);
        setCartItem([...cartItem,prod]);
        }
        setSingleQty(1);
      }
      if(loading)
      {
       return( 
        <>
       <div className="container">
        <div className="d-flex justify-content-center">
           
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            
            
           </div>
           </div>
           </>);
      }
    return (
        <>
        <div className="container">
        <div className="d-flex justify-content-center">
            {
                loading  && 
                (<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            }
  </div>
       
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><Link to="/shop">Products</Link></li>
   
    <li class="breadcrumb-item active" aria-current="page">{sigleProduct.title}</li>
  </ol>
</nav>
        {
            setSigleProduct && 
           <section>
            <div className="row">
            <div className="col-5 p-5">
                <img src={sigleProduct.image} style={{"width":"100%","height":"auto"}} />
            </div>
            <div className="col-7 p-5">
                <h1>{sigleProduct.title}</h1>
                <div><h4>{symbol}{sigleProduct.price}</h4></div>
                <p>{sigleProduct.description}</p>
                <Rating
                fullSymbol="fa fa-star fa-2x"
                emptySymbol="fa fa-star-o fa-2x"
  initialRating={3}
  readonly
/>
                <span><input style={{'width':'50px'}} type="number" min="1" max="20" value={singleQty} onChange={(e)=>{setSingleQty(e.target.value)}}/> <button className="btn btn-dark" onClick={()=>{AddtoCart(sigleProduct)}}>Add to Cart</button></span>
                <p className="mt-2 mb-2"><strong>category: </strong>{sigleProduct.category}</p>
            </div>
            </div>
           </section>
        
           
        }
        
        </div>
       
        </>
    )
}