import React from 'react'
import styles from './customers.module.css'
import Link from 'next/link'
import Search from 'antd/es/input/Search'
import { Button } from 'antd'
function CustomersPage() {
  return (
    <div className={styles.container}>
    <div className={styles.top}>
      <Search placeholder="Search for a user..."  className={styles.search}/>
      <Link href="/dashboard/customers/add">
        <button className={styles.addButton}>Add New</button>
      </Link>
    </div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <th>Abdullahi TAhliil</th>
          <th>shutiyare143@gmail.com</th>
          <th>08:20 am</th>
          <th>Admin</th>
          <th>Active</th>
          <th><Button type='primary'>delete</Button></th>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default CustomersPage