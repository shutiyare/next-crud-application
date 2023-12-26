'use client'
import { sql } from '@vercel/postgres'
import { Button, Flex, Modal } from 'antd'
import React, { useState } from 'react'
interface IProps {
    deleteItem?: React.ReactNode
}
function ActionButtons({DeleteItem}:{DeleteItem}) {
    const deleteItem =  () => {
        // 'use server'
        // const req= await sql`SELECT * FROM students`
        console.log('delete id')
    }
    const [open, setOpen] = useState(false);


    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    // const deleteItem = async () => {
    //     // 'use server'
    //     // const req= await sql`SELECT * FROM students`
    //     console.log('delete id')
    // }
    return (
        <div>
            <Flex gap="medium" wrap="wrap" justify='space-between'>
                <Button type="text" style={{ color: 'blue' }} >Update </Button>
                <Button type="text" style={{ color: 'red' }} onClick={() => {
                    Modal.confirm({
                        title: 'Confirm',
                        content: 'Are you sure you want to delete this student',
                        onOk:()=>{
                            deleteItem();
                        },
                        footer: (_, { OkBtn, CancelBtn }) => (
                            <>
                                <CancelBtn />
                                <OkBtn />
                            </>
                        ),
                    });
                }} >
                    Delete</Button>
            </Flex>
        </div>
    )
}

export default ActionButtons