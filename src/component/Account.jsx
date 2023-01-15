import React from "react";
import { useState } from "react";
import 'bootstrap/js/src/toast';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

import Login from "./Login";

export default function Account()
{
  let result;
  const user = auth.currentUser;
  const token = sessionStorage.getItem('Auth Token');
  const navigate = useNavigate();
  if(!user)
  {
    return <Login />
  }
  return(<>

  <div className="container pt-5 pb-5 ">
   <div className="row">
  <div className="col-3">
    <div className="list-group" id="list-tab" role="tablist">
      <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Home</a>
      <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Profile</a>
      <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Cart</a>
      <a className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Wishlist</a>
    </div>
  </div>
  <div className="col-9">
    <div cclassName="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
        <h2>Hello {user.displayName}</h2>
        <h3>Welcome to my store</h3>
        </div>
      <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
      <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
      <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
    </div>
  </div>
</div>
   
 
    
</div>   
        </>
    )
}