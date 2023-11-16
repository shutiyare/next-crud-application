'use client'
import React,{FormEvent} from 'react'
import './register.css'
function Form() {
    const  handleRegister=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formdata=new FormData(e.currentTarget)
        const response= await fetch('/api/auth/register',{
            method:'POST',
            body:JSON.stringify({
                email:formdata.get('email'),
                password:formdata.get('password'),
            })
        });
        console.log({response})
      }
  return (
    <div className='container'>
        <form  className='login-form' onSubmit={handleRegister}>
        <h1>Register</h1>
            <label >Username:</label>
            <input  type="text" id="username" name="email" placeholder="Enter your username" required />

            <label >Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />

            <button type="submit">Register</button>
        </form>
      </div>
  )
}

export default Form