import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { use } from "react";

const authoptions:NextAuthOptions =NextAuth({
    session:{
        strategy:'jwt'
    },
    providers:[
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
              },
              async authorize(credentials, req) {
                const response= await sql`
                SELECT * FROM users WHERE email=${credentials?.email}`;
                const user= response.rows[0];
                const correctPassword= await compare(credentials?.password,user.password);
                console.log(correctPassword)
                if (correctPassword){
                    return{
                        id:user.id,
                        email:user.email
                    }
                }
                return null
              }

        })
    ]
})
const handler=NextAuth(authoptions);
export {handler as GET, handler as POST};