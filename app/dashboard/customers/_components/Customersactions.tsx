// 'use client'
import { sql } from '@vercel/postgres'
import { Button, Flex, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { StudentsI } from '../../students/page'
import { CustomersI } from '../page'
import DeleteCustomer from './Deletecustomer'
interface IProps {
    customer?: CustomersI
}
function CustomerActions({customer}:{customer:IProps}) {
    return (
        <div>
            <Flex gap="medium" wrap="wrap" justify='space-between'>
                <Button type="text" style={{ color: 'blue' }} href={`/dashboard/customers/${customer.customer.customer_id}`} >Update </Button>
                <DeleteCustomer customerId ={customer.customer.customer_id} />
            </Flex>
        </div>
    )
}

export default CustomerActions