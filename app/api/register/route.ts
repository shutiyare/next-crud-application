import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { message } from "antd";
export  async function POST(request:Request){
    try {
        const {email,password,username,image,avatar}= await request.json();
        // validate data here
        const userExistsQuery =await sql`SELECT * FROM users WHERE email = ${email};`
    //   const userExistsResult = await pool.query(userExistsQuery, [username]);

      if (userExistsQuery.rows.length > 0) {
        // return request.
        return NextResponse.json({ error: 'User already exists' });
      }
        console.log({email:email,password:password})
        // hash password
        const hashedPassword= await hash(password,10);
        const response= await sql`
        INSERT INTO users (email,password,username,image,avatar) VALUES (${email},${hashedPassword},${username},${image},${avatar})`;
        console.log(response)
        const users=response.fields
    return NextResponse.json({users:users});

    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:'users registered successfully'})
}

export  async function GET(request:NextRequest){
  const query= await sql`SELECT * FROM users; `;
  const users= query.rows
  return NextResponse.json({users})

}