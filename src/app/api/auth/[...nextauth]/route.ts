import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";


const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"text"},
                password:{label:"Password", type: "password"}
            },
            async authorize(credentials){
                await connectDb();

                const user=await User.findOne({email: credentials?.email});

                if(!user) throw new Error("No user found")

                const isValidPassword=await bcrypt.compare(credentials!.password, user.password);

                if(!isValidPassword) throw new Error("Incorrect Password")

                return {id: user._id.toString(), email: user.email, name: user.name}
            }
        })
    ],
    pages:{
        signIn: "/signin"
    },
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id=user.id;
                token.name=user.name;
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.id=token.id;
            }
            return session
        }
    }
})