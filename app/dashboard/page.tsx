
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Dashboard() {
  const notify=()=> toast('wow welcome mr shutiye')
  return (
    <div>
        <p>this is protected page dashboard</p>
        {/* <button onClick={notify}>notify me</button>
        <ToastContainer /> */}
    </div>
  )
}

export default Dashboard