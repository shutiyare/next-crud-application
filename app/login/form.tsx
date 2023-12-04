'use client'
import React,{FormEvent} from 'react'
import {signIn} from 'next-auth/react'
import './login.css'
import NextAuth from 'next-auth/next'
import { useRouter } from 'next/navigation'
function Form() {
    const router=useRouter();
    const  handleLogin=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formdata=new FormData(e.currentTarget)
        const response=await signIn('credentials',{
            email:formdata.get('email'),
            password:formdata.get('password'),
            // redirect:false
        });
        if(!response?.error){
            router.push('/');
            router.refresh();
        }
        console.log(response)
      }
  return (
    <div className='container'>
        <form  className='login-form' onSubmit={handleLogin}>
        <h1>Login</h1>
            <label >Username:</label>
            <input  type="text" id="username" name="email" placeholder="Enter your username" required />

            <label >Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />

            <button type="submit">Login</button>
        </form>
      </div>
  )
}

export default Form