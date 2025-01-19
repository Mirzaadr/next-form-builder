"use server";

import { signIn } from "@/lib/auth";
import { getUserByEmail } from "@/lib/data/user";
import { SigninSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/settings";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const login = async (
  values: z.infer<typeof SigninSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid input", data: null };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, message: "Email does not exist", data: null };
  }

  if (!existingUser.emailVerified) {
    // TODO: handle sending verification email and token

    return { success: false, message: "Invalid Credentials", data: null };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      redirect: true,
    });
    return { success: true, message: "Successfully signed in", data: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid Credentials", data: null };
          break;
        default:
          return { success: false, message: "Something wrong", data: null };
          break;
      }
    }
    throw error;
    // return { success: false, message: "Something wrong", data: null };
  }
};
