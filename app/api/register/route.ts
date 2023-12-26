import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { message } from "antd";
export  async function POST(request:Request){
    try {
        const {email,password}= await request.json();
        // validate data here
        const userExistsQuery =await sql`SELECT * FROM users WHERE email = ${email};`
    //   const userExistsResult = await pool.query(userExistsQuery, [username]);

      if (userExistsQuery.rows.length > 0) {
        // return request.
        // return res.status(400).json({ error: 'User already exists' });
      }
        console.log({email:email,password:password})
        // hash password
        const hashedPassword= await hash(password,10);
        const response= await sql`
        INSERT INTO users (email,password) VALUES (${email},${hashedPassword})`;
        console.log(response)
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'success'})
}