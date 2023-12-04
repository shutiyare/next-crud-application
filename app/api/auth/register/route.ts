import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
export  async function POST(request:Request){
    try {
        const {email,password}= await request.json();
        // validate data here
        console.log({email:email,password:password})
        // hash password
        const hashedPassword= await hash(password,10);
        const response= await sql`
        INSERT INTO users (email,password) VALUES (${email},${hashedPassword})`;
        console.log(response)
        alert(`you have been registered user : ${email}`)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
}