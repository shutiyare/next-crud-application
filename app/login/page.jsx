'use client'
import React from 'react'
import  './login.css'
function LoginPage() {
  const handleclick=(e)=>{
    e.preventDefault();
  }
  return (
      <div className='container'>
        <form  className='login-form' onSubmit={handleclick}>
        <h1>Login</h1>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />

            <button type="submit">Login</button>
        </form>
      </div>
  )
}

export default LoginPage