'use client'
import { Spin } from 'antd';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Authprovider({children}:{children:React.ReactNode}) {
    const router=useRouter();
    const {data:session,status} =useSession();
    useEffect(() => {
    if(status=='unauthenticated'){
        router.replace('/login');
    }
    }, [status]);
    if(status == 'loading'){
        return <Spin size='large' fullscreen spinning/>
    }
  return (
    <>
    {children}
    </>
  )
}

export default Authprovider