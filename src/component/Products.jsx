import React from "react";
import { ReactDOM } from "react";
import { useState } from 'react';
import { useContext } from 'react';
// import { CurrencytoState } from "../../Currencycontext";
import Productlist from "./Productlist";
import Category from "./Category";
export default function Products()
{ const [catName, setCatName] = useState('All');
const [order, setOrder] = useState("");
    const getCatname = (val)=>{
        console.log(val);
        setCatName(val);
    }
    const getorder = (o)=>{
        console.log("order" + o);
        setOrder(o);
    }
    return(
        <>
       
        <div  className="container pt-5 pb-5">
            
        <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12"><Category getCatname={getCatname} getorder={getorder}/></div>
            <div className="col-md-9 col-sm-9 col-xs-12"><Productlist catname={catName} order={order}/></div>
        </div>
        </div>
        </>
    )
}