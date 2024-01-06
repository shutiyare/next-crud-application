import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request:NextRequest,{params}){
//     const {student_id}=params;
//     const response= await sql`SELECT * FROM students; `
// }


interface Params {
    id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {


    // const customer_id = await req.json();
    const {email,name,age,phone,isActive,nationality,address}= await req.json();


    const updatedCustomer = await sql`
    INSERT INTO customers (name,age,phone,nationality,isActive,address,email)
     VALUES (${name},${age},${phone},${nationality},${isActive},${address},${email})`;

    if (!updatedCustomer) {
        return NextResponse.json("Unknown Customer", { status: 404 })
    }
    return NextResponse.json(updatedCustomer, { status: 201 })
};


export async function DELETE(req: NextRequest, { params }: { params: Params }) {


    const deletedTodo = await sql`DELETE FROM customers WHERE customer_id=${params.id};`;

    if (!deletedTodo) {
        return NextResponse.json("Unknown Customer", { status: 404 })
    }
    return NextResponse.json(deletedTodo, { status: 201 })
}