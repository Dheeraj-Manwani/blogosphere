import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogMiddleWare } from "./blog";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//* Middleware to check bearer token
userRouter.use("/*", blogMiddleWare);

//* Get user
userRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const authorId = c.get("userId");

  if (id === authorId) {
    try {
      const user = await prisma.user.findFirst({
        select: {
          name: true,
          email: true,
          profileImage: true,
          description: true,
        },
        where: {
          id: id,
        },
      });

      return c.json(user);
    } catch (e) {
      c.status(500);
      console.log(e);
      return c.json({ error: true, message: "Something went wrong!!" });
    }
  } else {
    console.log(id, "   ::   ", authorId);
    c.status(401);
    return c.json({ error: true, message: "Invalid id" });
  }
});

//* Update user
userRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log("body for put of user details", body);

  try {
    await prisma.user.update({
      data: {
        profileImage: body.profileImage,
        description: body.description,
      },
      where: {
        id: body.id,
      },
    });

    return c.json({ message: "update successfull" });
  } catch (e) {
    c.status(500);
    console.log(e);
    return c.json({ error: true, message: "Something went wrong!!" });
  }
});

//* Sign in
// userRouter.post("/signin", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const body = await c.req.json();

//   const { success } = signinInput.safeParse(body);
//   if (!success) {
//     c.status(400);
//     return c.json({ error: true, message: "Invalid Credentials!!" });
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       email: body.email,
//       password: body.password,
//     },
//   });

//   if (!user) {
//     c.status(403);
//     return c.json({ error: true, message: "Incorrect username or password!!" });
//   }

//   const jwt = await sign(
//     { id: user.id, name: user.name, email: body.email },
//     c.env.JWT_SECRET
//   );
//   return c.json({ token: jwt, name: user.name, email: body.email });
// });

// userRouter.get("/logged-in-user-name", async (c) => {
//   const jwt = c.req.header("Authorization");
//   if (!jwt) {
//     return c.json({ name: "" });
//   }
//   const payload = await verify(jwt, c.env.JWT_SECRET);
//   if (!payload) {
//     return c.json({ name: "" });
//   }
//   return c.json({ name: payload.name });
// });
