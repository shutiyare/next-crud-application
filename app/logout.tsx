import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

async function Logout() {
    const session= await getServerSession();
  return (
    <span onClick={()=> signOut}> logout</span>
    
  )
}

export default Logout