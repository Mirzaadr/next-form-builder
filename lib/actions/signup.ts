"use server";

import { SignupSchema } from "@/lib/validations";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/data/user";
import { UserRole } from "@prisma/client";

export const register = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "invalid input", data: null };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { success: false, message: "email already used", data: null };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: handle sending verification email and token
  // for now every user registered will automatically verified
  await db.user.update({
    where: { id: newUser.id },
    data: {
      emailVerified: new Date().toISOString(),
    },
  });

  return { success: true, message: "Confirmation email sent", data: null };
};
