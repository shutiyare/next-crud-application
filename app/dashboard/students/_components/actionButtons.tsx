// 'use client'
import { sql } from '@vercel/postgres'
import { Button, Flex, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { StudentsI } from '../page'
import DeleteStudent from './DeleteStudent'
interface IProps {
    student?: StudentsI
}
function ActionButtons({student}:{student:IProps}) {
    return (
        <div>
            <Flex gap="medium" wrap="wrap" justify='space-between'>
                <Button type="text" style={{ color: 'blue' }} href={`/dashboard/students/${student.student.student_id}`} >Update </Button>
                <DeleteStudent studentId ={student.student.student_id} />
            </Flex>
        </div>
    )
}

export default ActionButtons