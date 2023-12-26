'use client'
import React,{FormEvent} from 'react'
import './register.css'
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { message } from 'antd';
function RegisterForm() {
    const router= useRouter();
    const  handleRegister=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formdata=new FormData(e.currentTarget)
        const response= await fetch('/api/register',{
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                email:formdata.get('email'),
                password:formdata.get('password'),
            }),
        });
        // revalidatePath('/register')
        // redirect('/dashboard')
        if(!response.ok && response.status !==200){
            message.error('No user registered.')
        }
        message.success('user registered successfully')
        router.refresh();
        router.push('/login')
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

export default RegisterForm