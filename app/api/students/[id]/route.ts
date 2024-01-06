import { sql } from "@vercel/postgres";
import { type NextRequest, NextResponse } from "next/server";

// export async function GET(request:NextRequest,{params}){
//     const {student_id}=params;
//     const response= await sql`SELECT * FROM students; `
// }


interface Params {
    id: string;
}
export  async function GET(request:NextRequest,{ params }: { params: Params }){
    const{student_id}=await request.json();
    const query= await sql`SELECT * FROM students WHERE student_id=${params.id}; `;
    const students= query.rows
    console.log(query)
    return NextResponse.json({query})

}
export async function PUT(req: NextRequest, { params }: { params: Params }) {


    // const customer_id = await req.json();
    const { first_name, last_name, date_of_birth, gender, email, address, phone_number, enrolled_program, is_active } = await req.json();



    const updatedstudent = await sql`
    INSERT INTO students (first_name,last_name,date_of_birth ,gender,email,address,phone_number,enrolled_program,is_active)
     VALUES (${first_name},${last_name},${date_of_birth},${gender},${email},${address},${phone_number},${enrolled_program},${is_active}) `;

    if (!updatedstudent) {
        return NextResponse.json("Unknown student", { status: 404 })
    }
    return NextResponse.json(updatedstudent, { status: 201 })
};


export async function DELETE(req: NextRequest, { params }: { params: Params }) {


    const deletedTodo = await sql`DELETE FROM students WHERE student_id = ${params.id};`;

    if (!deletedTodo) {
        return NextResponse.json("Unknown student", { status: 404 })
    }
    return NextResponse.json(deletedTodo,{ status: 201 },)
}
