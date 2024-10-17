import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  const { username, email, password } = await request.json();
  try {
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "username already taken",
        },
        {
          status: 400,
        }
      );
    }
    const existingUserEmail = await UserModel.findOne({
      email,
    });
    if (existingUserEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "email already exist",
        }),
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return Response.json(
      {
        success: true,
        message: "registereed successfull",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
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
