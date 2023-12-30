import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
import { Link, json } from 'react-router-dom'
// import Navbar from '../../components/Navbar/Navbar'

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const loginBtn= async()=>{
   
    if (!email) {
        alert("email is required")
        return;
    }
    if (!password) {
        alert("password is required")
        return;
    }
  
     
  const response = await axios.get('/login',{
  
    email:email,
    password:password,
  
    })

    if (response?.data?.user) {
      console.log(response?.data?.message)
    localStorage.setItem("user",JSON.stringify(response.data.user))

        window.location.href='/'
     } 
    else {
        alert(response?.data?.message)
    }

  
}

const checkvalidity=()=>{
  const response =JSON.parse(localStorage.getItem("user"))
  if(response){
      alert('you  have already logged in ')
      window.location.href='/'
  }


}
useEffect(()=>{
  checkvalidity()
},[])

 

  
  return (
    <>
{/* <Navbar/> */}
        <div className='signup-form'>
        <h1 className='text-center'>Login</h1>
   
        <div>
                {/* <label htmlFor="name">Email</label> */}
                <input type="email"
                    placeholder="Enter Email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            <div>
                {/* <label htmlFor="password">Password</label> */}
                <input type="password"
                    placeholder="Password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
       
       
        <button type='button' className='btn' onClick={loginBtn} >LogIn</button>
        <Link to="/singup"  className='link'>Don't have account ? SignUp</Link>

    </div>
    </>

  )
}