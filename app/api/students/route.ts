import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { message } from "antd";
export  async function POST(request:Request){
    try {
        const {first_name,last_name,date_of_birth ,gender,email,address,phone_number,enrolled_program,is_active}= await request.json();
        // validate data here
        console.log({email:email,date_of_birth:date_of_birth})
        // if(!email || !name || !age || !phone || !isActive || !nationality || !address) {
        //     throw new Error('fileds are required')
        // }
        const response= await sql`
        INSERT INTO students (first_name,last_name,date_of_birth ,gender,email,address,phone_number,enrolled_program,is_active)
         VALUES (${first_name},${last_name},${date_of_birth},${gender},${email},${address},${phone_number},${enrolled_program},${is_active}) `;
        // console.log(response)
    return NextResponse.json({response})

    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
   
}

export  async function GET(request:NextRequest){
    const query= await sql`SELECT * FROM students; `;
    const students= query.rows
    console.log(students)
    return NextResponse.json({students})

}