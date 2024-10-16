import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await dbConnect();
  //   console.log(await request.text()); // Logs raw body

  try {
    // console.log("trying");
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } =
      await request.json();

    // console.log("Parsed body:", { username, email, password });

    const existingUserEmail = await UserModel.findOne({ email });
    // console.log(existingUserEmail);
    if (existingUserEmail) {
      return NextResponse.json(
        {
          success: true,
          message: "Email already exist",
        },
        { status: 400 }
      );
    }

    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        {
          success: true,
          message: "Username not available",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      newUser.save();
    }

    return NextResponse.json(
      { success: true, message: "user signup successfully" },
      { status: 201 }
    );
  } catch (error) {
    // console.log("error while registering user", error);
    return NextResponse.json(
      {
        success: false,
        message: "error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
