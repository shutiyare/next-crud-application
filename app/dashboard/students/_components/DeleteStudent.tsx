'use client'
import { Button, Modal, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function DeleteStudent({ studentId }: { studentId: number }) {
    const router = useRouter();
    const handleDelete = async () => {
        try {

            const res = await fetch(`/api/students/${studentId}`, {
                method: 'DELETE',
                
            });
            await res.json();
            message.info(`student successfully deleted`);
            router.refresh();
        } catch (error) {
            console.error(error)
        }
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
  return (
    <div>
<Button type="text" style={{ color: 'red' }} onClick={() => 
{
                    Modal.confirm({
                        title: 'Confirm',
                        content: `Are you sure you want to delete this user`,
                        onOk:()=>handleDelete(),
                        footer: (_, { OkBtn, CancelBtn }) => (
                            <>
                                <CancelBtn />
                                <OkBtn />
                            </>
                        ),
                    });
                }
                } >
                    Delete</Button>
    </div>
  )
}

export default DeleteStudent