import React, { FormEvent } from 'react'
import './register.css'
import Form from './form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
async function RegisterPage() {
  return (
    <>
    <Form />
    </>
  )
}

export default RegisterPage