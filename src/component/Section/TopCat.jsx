import React from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import electronicimg from '../../image/camera.jpg';
import menImage from '../../image/mens-cat.jpg';
import womentImage from '../../image/womens-cat.jpg';
import { Routes, Route, Link } from "react-router-dom";



export default function TopCat()
{ 
const allcat = [

   {
    title:'Electronics',
    image:`${electronicimg}`
   },
   {
    title:"men's clothing",
    image:`${menImage}`
   },
   {
    title:"women's clothing",
    image:`${womentImage}`
   },
   {
    title:'Jewelery',
    image:`${electronicimg}`
   },
   
]
    return(
        <>
        <div style={{'background':'#fbfbfb'}} className="container-fluid pt-3 pb-3">
        <div className="container">
        <h2 className="text-center pt-3 pb-3">Shop By Category</h2>
        <Row xs={1} md={4} sm={2} className="g-4">
      { allcat.map((catname, index)=>{
           
        return (
            <Col>
          <Card id={index} className="prod-card" style={{'backgroundImage':`url('${catname.image}')`,'height':'320px',
        'backgroundPosition':'center','backgroundSize':'cover'}}>
            {/* <Card.Img className="img-fluid" style={{maxHeight:"220px"}} variant="top" src={catname.image} /> */}
            <Card.Body className="d-flex justify-content-center align-items-center">
              <Link style={{'textDecoration':'none','color':'#fff'}} to={'/category='+(catname.title).toLowerCase()}>
                <Card.Title style={{'background':'#000'}}  className="text-center p-3 m-0">{catname.title}</Card.Title>
                </Link>
              
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