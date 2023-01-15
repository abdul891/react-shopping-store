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

export default function LatestProducts()
{ 
    const [productlist, setproductlist] = useState([]);
    const [loading, setLoading] = useState(true);
    
   let {symbol, currency, cartItem, setCartItem, addCart} = CurrencytoState();
    useEffect(()=>{
     // console.log(props.order);
      let url;
      
      
         url ='https://fakestoreapi.com/products';
      
      
     
     axios.get(url).then((data)=>{
      // console.log(data.data);
      
       setproductlist(data.data);
       setLoading(false);
       console.log(data.data);
     
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
        <div style={{'background':'#f4feff'}} className="container-fluid pt-3 pb-5">
        <div className="container">
        <h2 className="text-center pt-3 pb-3">Latest Products</h2>
        <div className="d-flex justify-content-center">
            {
                loading  && 
                (<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )
            }
  </div>
        <Row xs={1} md={4} sm={2} className="g-4">
      { productlist.slice(0,4).map((item, index)=>{
           
        return (
            <Col>
          <Card id={item.id} className="p-2 prod-card">
            <Card.Img className="img-fluid" style={{'maxWidth':'160px','margin':'0 auto'}} variant="top" src={item.image} />
            <Card.Body className="p-0 pt-2 pb-2 text-center">
              <Link to={"/" + item.id} style={{'textDecoration':'none','color':'#000'}}><Card.Title>{(item.title).slice(0,23)}...</Card.Title></Link>
              <h5><strong>{symbol}{item.price}</strong></h5>
              {/* <button onClick={()=>{addCart(item)}}>Add to Cart</button> */}
              <button className="btn btn-dark" onClick={()=>{AddtoCart(item)}}>Add to Cart</button>
            </Card.Body>
          </Card>
        </Col>
        )
      })
    
      }
    </Row>
    </div>
    </div>
        </>
    )
}