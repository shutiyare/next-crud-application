
'use client'
import { FormEvent,useState } from "react";
import styles from "./adduser.module.css";
import { useRouter, } from "next/navigation";
import { Spin, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const AddUserPage = () => {
  const router= useRouter();
  const [loading, setloading] = useState(false)
  const  registerCustomers=async (e:FormEvent<HTMLFormElement>)=>{
    setloading(true)
    e.preventDefault();
    const formdata=new FormData(e.currentTarget)

    const response= await fetch('/api/customers',{
      
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            name:formdata.get('name'),
            email:formdata.get('email'),
            phone:formdata.get('phone'),
            isActive:formdata.get('isActive'),
            address:formdata.get('address'),
            age:formdata.get('age'),
            nationality:formdata.get('nationality')
        }),
    });
    console.log({response})
    if(!response.ok && response.status !== 200){
    message.error('no data set into the database')
  }
  else{

  setloading(false)
    message.success(`user successfully registered`);
    router.refresh();
    router.push('/dashboard/customers');
  }

    // redirect('/dashboard')

  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={registerCustomers} autoComplete="off">
        <input type="text" placeholder="name" name="name" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="number"
          placeholder="age"
          name="age"
          required
        />
        <input type="phone" placeholder="phone" name="phone" />
        <input type="text" placeholder="nationality" name="nationality" />

        <select name="isActive" id="isActive">
          <option >
            Is Active?
          </option>
          <option >Yes</option>
          <option >No</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows={16}
          placeholder="Address"
        ></textarea>

        <button type="submit">
          {loading && <Spin spinning indicator={<LoadingOutlined  style={{fontSize:30}}/>} size="large"/>}
          Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;