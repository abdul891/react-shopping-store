import React from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CurrencytoState } from '../Currencycontext';
import { Routes, Route, Link } from "react-router-dom";
import heroimage from '../image/hero-imgae.png';
import 'bootstrap/js/src/toast';

export default function Productlist({catname, order})
{ 
    const [productlist, setproductlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(false);
   let {symbol, currency, cartItem, setCartItem, addCart} = CurrencytoState();
   const SortProduct = async ()=>{
    
    let sortData = await productlist.sort((a,b)=>{
     
      if(order==='high-to-low')
      {
        return b.price - a.price;
      }
      else{
        return a.price - b.price;
      }
     });
     setproductlist(sortData);
   }
    useEffect(()=>{
     // console.log(props.order);
     setLoading(true);
     
      let url;
      if(catname == 'All')
      {
         url ='https://fakestoreapi.com/products';
      }
      else{
        if(catname)
        {
          url =`https://fakestoreapi.com/products/category/${catname}`;
        }
        else{
          url ='https://fakestoreapi.com/products';
        }
        
      }
     
     axios.get(url).then((data)=>{
      // console.log(data.data);
      if(order)
      {
        setproductlist((data.data).sort((a,b)=>{
          if(order === 'high-to-low')
          {
          return b.price - a.price;
          }
          else{
            return a.price - b.price;
          }
        }));
      }
      else
      {
       setproductlist(data.data);
      }
      //  if(order != '')
      //  {
      //   SortProduct();
      // }
      
      
      
       setLoading(false);
     
     }).catch((err)=>{
        console.log(err);
     })
    },[catname,order])
    const AddtoCart = (prod)=>{
      setToast(false);
      setTimeout(()=>{
        setToast(true)
      },500);
      window.scrollTo(0, 0);
      if(cartItem.some((citem)=> citem.id === prod.id))
      {  
        
        setCartItem((cart) =>
        cart.map((cartItem) =>
          cartItem.id === prod.id
            ? {
                ...cartItem,
                qty: cartItem.qty + 1
              }
            : cartItem
        )
      );
     
          return;
      }
      else
      {
        prod.qty=1;
      setCartItem([...cartItem,prod]);
      }
      
     
    }
    return(
        <>
        
        <div className="container">
        {toast && <div style={{'width':'100%'}} className="toast show mt-2 mb-2 align-items-center  bg-success text-white" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="d-flex">
    <div className="toast-body">
   Product added on cart <Link className="text-white" to='/cart'>View Cart</Link>
   </div>
    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>}
        <div className="d-flex justify-content-center">
            {
                loading  && 
                (<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            }
  </div>
        <Row xs={1} md={3} sm={2} className="g-4">
      { productlist.map((item, index)=>{
       
        return (
            <Col key={index}>
          <Card id={item.id} className="p-2 prod-card">
            <Card.Img className="img-fluid" style={{'maxWidth':'160px','margin':'0 auto'}}  variant="top" src={item.image} />
            <Card.Body className="p-0 pt-2 pb-2 text-center">
              <Link to={"/" + item.id} style={{'textDecoration':'none','color':'#000'}}><Card.Title>{(item.title).slice(0,23)}...</Card.Title></Link>
              <h5><strong>{symbol}{item.price}</strong></h5>
              {/* <button onClick={()=>{addCart(item)}}>Add to Cart</button> */}
              <button className="btn btn-dark" onClick={()=>{AddtoCart(item)}} id="liveToastBtn">Add to Cart</button>
            </Card.Body>
          </Card>
        </Col>
        )
      })
       
      }
    </Row>
    </div>
    
        </>
    )
}