// "use client"
import React from 'react'
import styles from './customers.module.css'
import Link from 'next/link'
import Search from 'antd/es/input/Search'
import { Button, Flex, Space, Table } from 'antd'
import { fetchCustomers } from '../../lib/data'
import ActionButtons from '../students/_components/actionButtons'
import CustomerActions from './_components/Customersactions'
async function getData() {
  const res = await fetch('http://localhost:3000/api/customers',{cache:'no-store'})

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
// const users= await sql`SELECT * FROM customers; `;
export interface CustomersI {
  customer_id: number,
  name: string,
  age: number,
  phone: string,
  nationality: string,
  isactive: boolean,
  address: string,
  email: string,
  createdat: string
}
async function CustomersPage() {
  const res = await fetch('http://localhost:3000/api/customers', { cache: 'no-cache' });
    const customerList: CustomersI[] = await res.json();
  const cutomers = await fetchCustomers();
  // const date= new Date().toLocaleDateString();
  function getDate(date) {
    // return new Date(date).toLocaleDateString()
    // const Ndate= String(date).split('T');
    // return Ndate[0]
    const nDate = new Date(date);
    return `${nDate.toLocaleDateString()}-${nDate.toLocaleTimeString()}`;
  }
  console.log('customers are :', customerList);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." className={styles.search} />
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
            <th>Action</th>
            {/* Add more headers for additional columns if needed */}
          </tr>
        </thead>
        <tbody>
          {cutomers.map((customer)=>(
            <tr key={customer.customer_id}>
            <td>{customer.customer_id}</td>
            <td>{customer.name}</td>
            <td>{customer.age}</td>
            <td>{customer.phone}</td>
            <td>{customer.nationality}</td>
            <td color={customer.isactive ? 'blue' : 'green'}>{customer.isactive ? 'Yes' : 'No'}</td>
            <td>{customer.address}</td>
            <td>{customer.email}</td>
            <td>{getDate(customer.createdat)}</td>
            <td>
            <Flex gap="medium" wrap="wrap" justify='space-between'>
                {/* <Button type="text" style={{ color: 'blue' }} href={`/dashboard/students/${student.student_id}`} >Update </Button> */}
                <CustomerActions customer={customer} />
            </Flex>
            </td>
            {/* Add more cells for additional columns if needed */}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomersPage