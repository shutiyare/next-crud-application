
'use client'
import { FormEvent, useState } from "react";
import styles from "./updatestudent.module.css";
import { useRouter, } from "next/navigation";
import { DatePicker, Spin, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import type { SelectProps } from 'antd';
import { fetchSingleStudent, fetchStudents } from "../../../lib/data";
import { sql } from "@vercel/postgres";
const { Option } = Select;
const options: SelectProps['options'] = [];
type FieldType = {
  username?: string;
  password?: string;
  email?: string;
};
type StudentList={
  student_id:number,
  first_name:string,
  last_name:string,
  date_of_birth:Date,
  gender:string,
  email:string,
  phone_number:number,
  address:string,
  enrolled_program:string,
  is_active:boolean

} 
async function getData(id:number) {
 return await `SELECT * FROM students WHERE student_id =${id};`;
  // if (student.rows.length>1) {
  //     throw new Error('Failed to fetch data')
  // }
  // return student.rows;
}
async function UpdateUserPage ({params}:{params:StudentList}){
  const router = useRouter();
  const [loading, setloading] = useState(false)
  const students = (await getData(params.student_id));
  // const students= await fetchSingleStudent(params.student_id);
console.log(students)
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  
  const registerStudents = async (e: any) => {
    e.preventDefault();
    setloading(true)
    console.log(e);
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    });
    if (response.ok && response.status == 200) {
      setloading(false)
      message.success(`Student successfully registered`);
      router.refresh();
      router.push('/dashboard/students');
    }else{
      message.error('student not registered');
    }
    console.log({ response });
  }
  return (
    <div className={styles.container}>
      
          
        
      <Form
        name="normal_login"
        className={`${styles.form} login-form`}
        initialValues={{ remember: true }}
        onFinish={registerStudents}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className={styles.in}
          name="first_name"

          rules={[{ required: true, message: 'Please input your firstName!', }]}
        >
          <Input
            // name="first_name"

            placeholder="first Name"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="last_name"

          className={styles.in}
          rules={[{ required: true, message: 'Please input your LastName!', }]}
        >
          <Input
            // name=""
            placeholder="Last Name"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="email"
          className={styles.in}
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input
            // prefix={<LockOutlined className={`${styles.input}site-form-item-icon`} />}
            // name=""
            placeholder="E-mail"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="phone_number"
          className={styles.in}
          rules={[{ required: true, message: 'Please input your Number!', }]}
        >
          <Input
            // name=""
            placeholder="Phone Number"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="address"
          className={styles.in}
          rules={[{ required: true, message: 'Please input your Address!', }]}
        >
          <Input
            // name=""
            placeholder="Address"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="enrolled_program"
          className={styles.in}
          rules={[{ required: true, message: 'Please input your enrolled Program!' }]}
        >
          <Input
            // prefix={<LockOutlined className={`${styles.input}site-form-item-icon`} />}
            // name=""
            placeholder="enrolled_program"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item
          name='gender'
          className={styles.in}
          rules={[{ required: true, message: 'please select gender' }]}
        >
          <select id="isActive">
            <option >
              Gender
            </option>
            <option >male</option>
            <option >female</option>
          </select>
        </Form.Item>
        <Form.Item
          name='is_active'
          className={styles.in}
          rules={[{ required: true, message: 'Please select one!', }]}
        >
          <select id="isActive">
            <option >
              Is Active?
            </option>
            <option >true</option>
            <option >false</option>
          </select>
        </Form.Item>
        <Form.Item
          name='date_of_birth'
          className={styles.in}
          rules={[{ required: true, message: 'Please input your date_of_birth!' }]}
        >
          <DatePicker size="large" />
        </Form.Item>

        <Form.Item className={styles.btn}>
          <Button type="primary" htmlType="submit" className={styles.button}>
            {loading && <Spin spinning indicator={<LoadingOutlined style={{ fontSize: 30 }} />} size="large" />}
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUserPage;