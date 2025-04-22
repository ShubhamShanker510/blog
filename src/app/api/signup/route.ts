import { NextResponse } from "next/server";
import connectDb from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    try {
        await connectDb();

        const {name, email, password}=await req.json();

        if(!name || !email || !password){
            return NextResponse.json(
                {
                    success: false,
                    message:"All fiels are required"
                },
                {status: 400}
            )
        }

        const exisitingUser=await User.findOne({email});

        if(exisitingUser){
            return NextResponse.json({
                success: false,
                message: "User already exist"
            },{status: 400})
        }

        const hashPassword=await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,
            email,
            password: hashPassword
        })

        return NextResponse.json({
            success: true,
            message: "User registered successfully"
        },{status: 200})

    } catch (error) {
        console.log("Error while signing up user", error);
        return NextResponse.json({
            success: false,
            error
        }, {status: 500})
    }
}