import { Routes, Route, useParams, json, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CurrencytoState } from '../Currencycontext';
import { FaTruckLoading } from "react-icons/fa";
export default function Category({getCatname, getorder})
{
    const [category, setCategory] = useState([]);
    const [isActive,setisActive] = useState("All");
     const [priceFilter, setPriceFilter] = useState("");
     
     let {catLists,setCatLists} = CurrencytoState();
         useEffect(()=>{
        axios.get('https://fakestoreapi.com/products/categories').then((data)=>{
         // console.log(data.data);
         setCatLists(data.data);
        }).catch((err)=>{
           console.log(err);
        })
       },[]);
       const handleClick = (val)=>{
       // console.log("clicked");
       setisActive(val);
        getCatname(val);
       }
       const hadlepricefilter =  (e)=>{
        setPriceFilter(e.target.value);
        //  console.log(e.target.value);
        getorder(e.target.value);
        
       }
    return(
        <>
        
        <h5>Filter By Price</h5>
        <div onChange={(e)=>{hadlepricefilter(e)}}>
        <div className="pt-2 form-check">

        <input type="radio" className="form-check-input"  name="sortorder" value="low-to-high"  checked={priceFilter == 'low-to-high'}/>
        <label className="form-check-label">Low to high</label>
        </div>
        <div className="pt-2 form-check">
        <input type="radio" className="form-check-input" name="sortorder" value="high-to-low"  checked={priceFilter == 'high-to-low'}/>
        <label>High to low</label>
      </div>
        </div>
        <h5 className="pt-3">Filter By Category</h5>
        <ul className="p-0 list-group">
            <li  className={`pt-2 pb-2 list-group-item ${isActive=='All' ? 'active':''}`}   onClick={()=>{handleClick('All')}}>All</li>
       {catLists.map((cat, index)=>{
         
           return <li className={`pt-2 pb-2 list-group-item ${isActive==cat ? 'active':''}`} key={index}  onClick={()=>{handleClick(cat)}}>{cat}</li>
        
       })}
       
        </ul>
        </>
    )
}