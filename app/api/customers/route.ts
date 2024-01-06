import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { message } from "antd";
export  async function POST(request:NextRequest){
    try {
        const {email,name,age,phone,isActive,nationality,address}= await request.json();
        // validate data here
        console.log({name:name})
        // if(!email || !name || !age || !phone || !isActive || !nationality || !address) {
        //     throw new Error('fileds are required')
        // }
        const response= await sql`
        INSERT INTO customers (name,age,phone,nationality,isActive,address,email)
         VALUES (${name},${age},${phone},${nationality},${isActive},${address},${email})`;
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
    
}

export  async function GET(request:NextRequest){
    const query= await sql`SELECT * FROM customers; `;
    const customers= query.rows
    return NextResponse.json({customers})

}