import React from "react";
import { ReactDOM } from "react";
import { useState } from 'react';
import { useContext } from 'react';
import { CurrencytoState } from "../Currencycontext";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
export default function Cart()
{ const navigate = useNavigate();
    let {symbol,currency, setCurrency , cartItem, setCartItem} =  CurrencytoState();
    let total = 0;
    const increaseqty = (item)=>{
        
        setCartItem((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                qty: cartItem.qty + 1
              }
            : cartItem
        )
      );
       
     
      
      
    }
    const descreaseqty = (item)=>{
        if(item.qty > 1)
        {
        setCartItem((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                qty: cartItem.qty - 1
              }
            : cartItem
        )
      );
        }
      }
      const removepro = (id)=>{
        const updatecart = cartItem.filter((citem)=>{
         return citem.id !== id;
        });
        setCartItem(updatecart);
      }
    if(auth.currentUser)
    {
      
    return(
        <>
        <div className="container pt-5 pb-5">
        {cartItem.length <= 0 && 
        
        <div className="text-center"><h2>Product Not Found</h2></div>
        }
      { cartItem.length>0 &&
        <table className="table">
  <tr>
                 <th></th> 
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                
                <th>Total price</th>
  </tr>
  {
  
    cartItem.map((item)=>{
        total = total + item.price*item.qty;
        return(
            <tr>
            <td><span onClick={()=>{removepro(item.id)}}>&#10006;</span></td>
            <td><img style={{"width":"100px","height":"100px"}} src={item.image} /></td>
            <td>
              <h5 className="p-0">{item.title}</h5>
              <p className="p-0">{(item.description).slice(0,50)}...</p>
              </td>
            <td>{symbol}{item.price}</td>
            <td><button  onClick={()=>{descreaseqty(item)}}>-</button><span>{item.qty}</span><button  onClick={()=>{increaseqty(item)}}>+</button></td>
            <td colSpan="4">{symbol}{(item.price*item.qty).toFixed(2)}</td>
          </tr>
        )
    })
  }
  <tr><td colspan="6" style={{'textAlign':'right'}}><strong>Total = {symbol}{total.toFixed(2)}</strong></td></tr>
  
</table>
}</div>
        </>
    )
}
else{
  return <Login />;
}
}
