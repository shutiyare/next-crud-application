'use client'
import React,{FormEvent, useState} from 'react'
import {signIn} from 'next-auth/react'
import './login.css'
import NextAuth from 'next-auth/next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
 function LoginForm() {
    const [error, seterror] = useState(null);
    const router=useRouter()
    const  handleLogin=async (e:FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault();
            const formdata=new FormData(e.currentTarget)
            // if(formdata.values.length ===0){
            //     seterror('no values');
            //     return
            // }
        const response=await signIn('credentials',{
            email:formdata.get('email'),
            password:formdata.get('password'),
            
            redirect:false
        });
        // console.log({response}) 
        // return;
        if(response?.error){
            seterror('invalid email or password');
            return
        }
        // router.refresh();
        router.replace('/dashboard');
        // console.log({response});
    } catch (error) {
            seterror(error);
            console.log(error)
    }
      }
  return (
    <div className='container'>
        <form  className='login-form' onSubmit={handleLogin}>
        <h1>Login</h1>
        {<span style={{color:'red',fontSize:'20px'}}>{error}</span>}
            <label >Username:</label>
            <input  type="text" id="username" name="email" placeholder="Enter your username"  />

            <label >Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password"  />
            {/* {Error} */}
            <button type="submit">Login</button>
            <span className='span'>Don't have account <Link href="/register">register here</Link></span>
        </form>
      </div>
  )
}

export default LoginForm