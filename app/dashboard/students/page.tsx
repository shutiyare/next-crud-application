// "use server"
import React from 'react'
import styles from './students.module.css'
import Link from 'next/link'
import Search from 'antd/es/input/Search'
import { Button, Flex, Modal, Space, Table, message } from 'antd'
import { DeleteStudent, fetchStudents } from '../../lib/data'
import ActionButtons from '../components/actionButtons'
import { sql } from '@vercel/postgres'
import { it } from 'node:test'
async function StudentsPage() {
  const students = await fetchStudents();
  // const dID= await DeleteStudent()
  const DeleteItem = async (id:number) => {
    const req= await sql`DELETE FROM students WHERE id=${id};`;
    // return req.rows;
    console.log(`deleted ${id}`);
}
  // const date= new Date().toLocaleDateString();
  function getDate(date) {
    // return new Date(date).toLocaleDateString()
    // const Ndate= String(date).split('T');
    // return Ndate[0]
    const nDate = new Date(date);
    return `${nDate.toLocaleDateString()}`;
  }
  // console.log('students are :', students)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a student..." className={styles.search} />
        <Link href="/dashboard/students/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.customersTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>isActive</th>
            <th>Address</th>
            <th>Email</th>
            <th>Faculty</th>
            <th>Date of birth</th>
            <th>Action</th>
            {/* Add more headers for additional columns if needed */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.phone_number}</td>
              <td>{student.gender}</td>
              <td style={{ color: student.is_active ? 'blue' : 'red' }}>{student.is_active ? 'Yes' : 'No'}</td>
              <td>{student.address}</td>
              <td>{student.email}</td>
              <td>{student.enrolled_program}</td>
              <td>{getDate(student.date_of_birth)}</td>
              <td>
                {/* <ActionButtons DeleteItem={DeleteItem} /> */}
              <Flex gap="medium" wrap="wrap" justify='space-between'>
                <Button type="text" style={{ color: 'blue' }} href={`/dashboard/students/${student.student_id}`} >Update </Button>
                <Button type="text" style={{ color: 'red' }} onClick={
                  async ()=>{
                    'use server'
                    const item =await sql`DELETE FROM students WHERE student_id=${student.student_id};`;
                    message.success(`${student.first_name} have delete succcessfully`)
                  }
                }>
                    Delete</Button>
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

export default StudentsPage