import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export  async function POST(request:Request){
    try {
        const {email,name,age,phone,isActive,nationality,address}= await request.json();
        // validate data here
        console.log({name:name,age:age})
        
        const response= await sql`
        INSERT INTO customers (name,age,phone,nationality,isActive,address,email)
         VALUES (${name},${age},${phone},${nationality},${isActive},${address},${email})`;
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
}

