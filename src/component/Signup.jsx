import React from "react";
import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/js/src/toast';

export default function Singup()
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const [name,setName] = useState('');
  const [phone, setPhone] = useState('');
  const [disable,setDisable] = useState(false);
  const navigate = useNavigate();
  const formsubmit = (e)=>{

    e.preventDefault();
    setDisable(true);
    if(email === '' || password === '' || name === '')
    {
      return setError('All field Required');
    }
    setError('');
    createUserWithEmailAndPassword(auth,email,password).then(
      (userCredential)=>{
        const user = userCredential.user;
        updateProfile(user,{
          displayName:name,
          phoneNumber:phone,


        });
        console.log(user);
        sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken);

        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        navigate('/account')
      }).catch((err)=>{
        console.log(err);
        setError(err.message);
      })
      setDisable(false);
  }
  return(
        <>
       
        <div  className=" p-3 mt-5 mb-5 authform">
        <form className="row g-3" onSubmit={formsubmit}>
        <div className="col-md-12">
    <label for="name" className="form-label">Name*</label>
    <input type="text" value={name} className="form-control" id="name" onChange={(e)=>{setName(e.target.value)}} required/>
  </div>
  <div className="col-md-12">
    <label for="phone" className="form-label">Phone</label>
    <input type="tel" value={phone} className="form-control" id="phone" onChange={(e)=>{setPhone(e.target.value)}} />
  </div>
  <div className="col-md-12">
    <label for="inputEmail4" className="form-label">Email*</label>
    <input type="email" value={email} className="form-control" id="inputEmail4" onChange={(e)=>{setEmail(e.target.value)}} required/>
  </div>
  <div className="col-md-12">
    <label for="inputPassword4" className="form-label">Password*</label>
    <input type="password" value={password} className="form-control" id="inputPassword4" onChange={(e)=>{setPassword(e.target.value)}} required/>
  </div>
  
  <span className="err-msg alert alert-danger">{error}</span>
  <div className="col-12">
    <button type="submit" className="btn btn-dark" disabled={disable}>Sign in</button>
  </div>
</form>

            </div>
            
        </>
    )
}