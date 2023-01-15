import React, { createContext, useContext, useEffect, useState } from "react";


const Currency = createContext();

const CurrencytoContext = ({ children }) => {
  let localcart = JSON.parse(localStorage.getItem('cartitem'))
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [catLists,setCatLists] = useState([]);
  const [cartItem,setCartItem] = useState(localcart);

  localStorage.setItem("cartitem", JSON.stringify(cartItem));
  

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);


const addCart = (item)=>{
    
    if(cartItem.some((citem)=> citem.id === item.id))
    {
        let updatecart = cartItem.map((citem) =>{
            if(citem.id === item.id)
            {  console.log(citem.id);
                let i = citem.qty++;
               
                return {...citem,qty:i};
              
            }
            return citem;
        });
        console.log(updatecart);
        setCartItem(updatecart);
        
        // console.log(updatecart);
    }
    else
    {
    item.qty=1;
    setCartItem([...cartItem,item]);
    }
    
    
}
  return (
    <Currency.Provider value={{ currency,symbol, setCurrency, cartItem, setCartItem, addCart,catLists,setCatLists}}>
      {children}
    </Currency.Provider>
  );
};

export default CurrencytoContext;

export const CurrencytoState = () => {
  return useContext(Currency);
};