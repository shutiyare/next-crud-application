import React from 'react'
import { fetchCustomers } from '../../lib/data';

async function customer() {
    const users=await fetchCustomers();
  return (
    <div>
        
    </div>
  )
}

export default customer