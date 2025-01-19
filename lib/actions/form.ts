"use server";

import { currentUser } from "@/lib/hooks/useCurrentUser";
import { db } from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/lib/validations/form";

class UserNotFoundErr extends Error {}

export const getFormStats = async () => {
  const user = await currentUser();
  if (!user) {
    // throw new UserNotFoundErr();
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  const stats = await db.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    success: false,
    message: "Unauthorized",
    data: {
      visits,
      submissions,
      submissionRate,
      bounceRate,
    },
  };
};

export const createForm = async (data: formSchemaType) => {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;

  const newForm = await db.form.create({
    data: {
      userId: user.id!,
      name,
      description,
    },
  });

  if (!newForm) {
    throw new Error("Unable to create new form");
  }

  return newForm.id;
};

export const getForms = async () => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getFormById = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
};
