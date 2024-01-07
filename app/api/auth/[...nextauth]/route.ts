import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import  { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";

  const OPTIONS:NextAuthOptions ={
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut:"/login",
    error:'/login'
  },
  jwt:{
    maxAge:60*60
  },
      providers:[
        
        CredentialsProvider({
          name:'Credentials',
            credentials: {
                email: {},
                password: {}
              },
              async authorize(credentials) {
                const { email, password } = credentials;
                // console.log(credentials);
                try {
                const response= await sql`
                SELECT * FROM users WHERE email=${credentials?.email}`;
                const user= response.rows[0];
                const correctPassword= await compare(credentials?.password || '',user.password);
                // console.log(correctPassword);
                
                if (!correctPassword){
                    return null
                }
                return {
                  id:user.id,
                  email:user.email,
                  image:user.image,
                  iavamage:user.avatar,
                  name:user.username,

              }
              } catch (error) {
                console.log(error)
          }
              }
        })
    ],
    // callbacks: {
    //     jwt({ token, user }) {
    //       if(user) token.email = user.email
    //       return token
    //     },
    //     session({ session, token }) {
    //       session.user.email = token.email
    //       return session
    //     }
    //   },
      
}

const handler=NextAuth(OPTIONS);
// const handler=NextAuth(authoptions);
export {handler as GET, handler as POST};