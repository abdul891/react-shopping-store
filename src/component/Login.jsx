import React from "react";
import { useState } from "react";

import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase-config";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap';
export default function Login()
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  
  const [disable,setDisable] = useState(false);
  const navigate = useNavigate();
  const formsubmit = (e)=>{
    
    e.preventDefault();
    setDisable(true);
    if(email === '' || password === '')
    {
      return setError('All field Required');
    }
    setError('');
    signInWithEmailAndPassword(auth,email,password).then(
      (userCredential)=>{
        const user = userCredential.user;
       
        console.log(user);
        setEmail('');
        setPassword('');
        sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken);
        navigate('/account');
      }).catch((err)=>{
        console.log(err);
        setError(err.message);
      })
      setDisable(false);
  }
  return(
        <>
       
        <div className="p-3 mt-5 mb-5 authform">
        <form className="row g-3" onSubmit={formsubmit}>
       
  <div className="col-md-12">
    <label for="inputEmail4" className="form-label">Email*</label>
    <input type="email" value={email} className="form-control" id="inputEmail4" onChange={(e)=>{setEmail(e.target.value)}} required/>
  </div>
  <div className="col-md-12">
    <label for="inputPassword4" className="form-label">Password*</label>
    <input type="password" value={password} className="form-control" id="inputPassword4" onChange={(e)=>{setPassword(e.target.value)}} required/>
  </div>
 {error && 
 <span className="err-msg alert alert-danger">{error}</span>
 } 
  
  <div className="col-12">
    <button type="submit" className="btn btn-dark" disabled={disable}>Sign In</button>
  </div>
</form>
<p className="pt-1 pb-1">Don't have account <Link to='/signup'>Signup</Link></p>

            </div>
            
        </>
    )
}