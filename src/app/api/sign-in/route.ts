import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = await req.json();

  if (!(username && email)) {
    return NextResponse.json(
      { success: false, message: "enter credential" },
      { status: 401 }
    );
  }

  // const;

  try {
  } catch (error) {
    console.log("problem while sign in");
    return NextResponse.json(
      { success: false, message: "error while loggin" },
      { status: 500 }
    );
  }
}
