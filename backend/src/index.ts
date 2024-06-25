import { Hono } from "hono";
import { cors } from "hono/cors";

import { blogRouter } from "./routes/blog";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors());
app.route("api/v1", authRouter);
app.route("api/v1/user", userRouter);
app.route("api/v1/blogs", blogRouter);

export default app;
