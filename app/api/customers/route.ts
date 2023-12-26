import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { message } from "antd";
export  async function POST(request:Request){
    try {
        const {email,name,age,phone,isActive,nationality,address}= await request.json();
        // validate data here
        console.log({name:name})
        // if(!email || !name || !age || !phone || !isActive || !nationality || !address) {
        //     throw new Error('fileds are required')
        // }
        const response= await sql`
        INSERT INTO customers (name,age,phone,nationality,isActive,address,email)
         VALUES (${name},${age},${phone},${nationality},${isActive},${address},${email}) RETURNING`;
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
    // const users = await sql`SELECT * FROM customers;`;
    // return NextResponse.json({ users }, { status: 200 });
}

