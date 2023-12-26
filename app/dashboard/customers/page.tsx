// "use server"
import React from 'react'
import styles from './customers.module.css'
import Link from 'next/link'
import Search from 'antd/es/input/Search'
import { Button, Space, Table } from 'antd'
import { fetchCustomers } from '../../lib/data'
async  function CustomersPage() {
  const cutomers= await fetchCustomers();
  // const date= new Date().toLocaleDateString();
  function getDate(date){
    // return new Date(date).toLocaleDateString()
    // const Ndate= String(date).split('T');
    // return Ndate[0]
    const nDate = new Date(date);
return `${nDate.toLocaleDateString()}-${nDate.toLocaleTimeString()}`;
  }
  // console.log('users are :',cutomers)
  return (
    <div className={styles.container}>
    <div className={styles.top}>
      <Search placeholder="Search for a user..."  className={styles.search}/>
      <Link href="/dashboard/customers/add">
        <button className={styles.addButton}>Add New</button>
      </Link>
    </div>
    
    <table className={styles.customersTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Nationality</th>
            <th>isActive</th>
            <th>Address</th>
            <th>Email</th>
            <th>CreatedAt</th>
            {/* Add more headers for additional columns if needed */}
          </tr>
        </thead>
        <tbody>
          {cutomers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.nationality}</td>
              <td color={customer.isActive? 'blue':'green'}>{customer.isActive ? 'Yes' : 'No'}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{getDate(customer.createdat)}</td>
              {/* Add more cells for additional columns if needed */}
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  )
}

export default CustomersPage