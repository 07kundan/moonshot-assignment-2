export const dynamic = "force-dynamic";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    // validating with zod
    const result = usernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError.length > 0
              ? usernameError.join(",")
              : "invalid query params",
        },
        { status: 400 }
      );
    }

    // if username is in correct formate
    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
    });

    // If username found in the database
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: true,
          message: "username is taken",
        },
        { status: 200 }
      );
    }

    // If not found
    return Response.json(
      {
        success: true,
        message: "username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "error while checking username",
      },
      {
        status: 500,
      }
    );
  }
}
