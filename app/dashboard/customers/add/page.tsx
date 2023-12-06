
'use client'
import { FormEvent } from "react";
import styles from "./adduser.module.css";
import { useRouter } from "next/navigation";

const AddUserPage = () => {
  const router= useRouter();
  const  registerCustomers=async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formdata=new FormData(e.currentTarget)
    const response= await fetch('/api/auth/register',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            name:formdata.get('name'),
            email:formdata.get('email'),
            phone:formdata.get('phone'),
            isActive:formdata.get('isActive'),
            address:formdata.get('address'),
            age:formdata.get('age'),
            nationality:formdata.get('nationality'),


        }),
    });
    router.refresh();
    router.push('/dashboard/customers');
    // redirect('/dashboard')
    console.log({response})
  }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={registerCustomers}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;