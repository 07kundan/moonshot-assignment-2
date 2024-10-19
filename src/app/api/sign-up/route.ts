import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  const { username, email, password } = await request.json();
  try {
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
    });

    // If username already exist
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

    // checking email int the database
    const existingUserEmail = await UserModel.findOne({
      email,
    });

    // If email already exist in the database
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

    // hashing password
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // creating document
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // returning response body
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
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "error while registering user",
      },
      {
        status: 500,
      }
    );
  }
}
