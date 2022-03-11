import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginProfile } from "../../../globalSetups/api";


export default NextAuth({
    site:process.env.NEXTAUTH_URL,  
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "email", placeholder: "jsmith@domain.com" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };
          const user = await loginProfile(payload)
          if(user.status===200){
            return user.data.user
          }
          else{
            return null
          }
        }
      })
    ],
    secret:process.env.JWT_KEY,
    callbacks: {
      async redirect({ url, baseUrl   }) {
        return baseUrl
      }
    },
    pages:{
      signIn:'/auth/signin'
    },
})