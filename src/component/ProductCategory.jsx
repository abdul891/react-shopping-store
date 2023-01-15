import React from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CurrencytoState } from '../Currencycontext';
import { Routes, Route, useParams, json, Link } from "react-router-dom";
export default function ProductCategory()
{  let params = useParams();
    const [productCatLists, setProductCatLists] = useState([]);
    const [loading, setLoading] = useState(true);
   let {symbol, currency, cartItem, setCartItem, addCart} = CurrencytoState();
    useEffect(()=>{
     axios.get(`https://fakestoreapi.com/products/category/${params.cat}`).then((data)=>{
      // console.log(data.data);
      setProductCatLists(data.data);
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

        <div className="container pt-5 pb-5">
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
      { productCatLists.map((item, index)=>{

        return (
            <Col>
          <Card id={item.id} className="p-2 prod-card">
            <Card.Img style={{'maxWidth':'160px','margin':'0 auto'}} variant="top" src={item.image} />
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
        </>
    )
}