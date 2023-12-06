import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
export  async function POST(request:Request){
    try {
        const {email,password}= await request.json();
        // validate data here
        // console.log({email:email,password:password})
        // hash password
        const hashedPassword= await hash(password,10);
        // check if the user already exist
        const userExist= await sql`
        SELECT * FROM users WHERE email = ${email}`
        if(userExist.rows.length>0){
            console.log('already exist this user')
        }
        const response= await sql`
        INSERT INTO users (email,password) VALUES (${email},${hashedPassword})`;
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
}