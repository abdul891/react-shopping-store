import React from "react";
import heroimages from '../../image/hero-imgae.png';

export default function HeroSection()
{
    return(
        <>
        <div style={{'background':`url('${heroimages}')`,'backgroundSize':'cover','backgroundPosition':'center','height':'400px'}} className="container p-0 text-center d-flex justify-content-center align-items-center flex-column">
        {/* <img className="img-fluid mt-3 mb-3 " src={heroimages}  /> */}
        <h1 style={{'color':'#fff'}}>Live life outdoors</h1>
        <br/>
        <p style={{'color':'#fff'}}>Clothing and gear built to live life well.</p>
        </div>
        </>
    )
}