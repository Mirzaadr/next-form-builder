import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // User
  const userAdmin = await prisma.user.create({
    data: {
      password: "$2a$10$1.l4xAnNalrU7Yj8fnMTGO0ZcoxuRM0P.w1ROk6YcszE6ykCGuXhW", // password123
      name: "Admin 1",
      email: "admin1@mail.com",
      emailVerified: new Date().toISOString(),
      role: UserRole.ADMIN,
    },
  });
  const userRegular = await prisma.user.create({
    data: {
      password: "$2a$10$1.l4xAnNalrU7Yj8fnMTGO0ZcoxuRM0P.w1ROk6YcszE6ykCGuXhW", // password123
      name: "User 1",
      email: "user1@mail.com",
      emailVerified: new Date().toISOString(),
      role: UserRole.USER,
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
