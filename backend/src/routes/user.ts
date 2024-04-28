import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@dheeraj1320/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

//* Sign up
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const token = await sign(
      { id: user.id, name: body.name, email: body.email },
      c.env.JWT_SECRET
    );

    return c.json({ token, name: body.name, email: body.email });
  } catch (e) {
    c.status(409);
    console.log(e);
    return c.json({ error: true, message: "Email already exists!!" });
  }
});

//* Sign in
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: true, message: "Invalid Credentials!!" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: true, message: "Incorrect username or password!!" });
  }

  const jwt = await sign(
    { id: user.id, name: user.name, email: body.email },
    c.env.JWT_SECRET
  );
  return c.json({ token: jwt, name: user.name, email: body.email });
});

userRouter.get("/logged-in-user-name", async (c) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    return c.json({ name: "" });
  }
  const payload = await verify(jwt, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ name: "" });
  }
  return c.json({ name: payload.name });
});
