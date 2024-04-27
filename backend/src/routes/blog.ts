import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@dheeraj1320/medium-common";
import {
  blogsDTO,
  blogsDTOConverter,
  createAnonymousBlog,
  createBlog,
  getAllBlogs,
} from "../services/blogService";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//* Middleware to check bearer token
blogRouter.use("/*", async (c, next) => {
  try {
    const jwt = c.req.header("Authorization");
    if (jwt && jwt.length > 12) {
      console.log("inside middleware ::::::    ", jwt);
      const token = jwt.split(" ")[1];
      if (!token || token === "null" || token.length < 10) await next();
      const payload = await verify(token, c.env.JWT_SECRET);
      if (!payload) {
        await next();
      }
      c.set("userId", payload.id);
    }
    await next();
  } catch (err) {
    console.log(err);
    c.status(401);
    return c.json({ error: "error occured while processing token" });
  }
});

//* Create blog for an auther
blogRouter.post("/", async (c) => {
  console.log(c.get("userId"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const id = c.get("userId");
  console.log("creating a blog");

  if (id) {
    return await createBlog(c, prisma, id, body);
  } else {
    return await createAnonymousBlog(c, prisma, id, body);
  }
});

//* Update blog for an auther
blogRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const id = c.req.param("id");
  const authorId = c.get("userId");

  if (authorId) {
    try {
      const res = await prisma.post.update({
        where: {
          id: id,
          authorId: authorId,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
    } catch (err) {
      c.json({
        error: true,
        message: "The blog you are trying to update is not yours",
      });
    }

    return c.json({
      id: body.id,
      message: "blog updated successfully",
    });
  }
  c.json({
    error: true,
    message: "The blog you are trying to update is not yours",
  });
});

//* Get all blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // console.log(c.json(await getAllBlogs(prisma, c)));
  // return await getAllBlogs(prisma, c);
  return await getAllBlogs(prisma, c);
});

//* Get all blogs for an author
blogRouter.get("/user-blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  if (!authorId) {
    c.status(401);
    return c.json({ error: "You need to be logged in to see your Blogs!!" });
  }

  const blogs = await prisma.post.findMany({
    where: {
      authorId,
    },
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  const blogsDTO: blogsDTO[] = blogs.map((blog) => {
    return blogsDTOConverter(blog);
  });

  return c.json(blogsDTO);
});

//* Get one blog
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const blog = await prisma.post.findFirst({
    where: {
      id,
    },
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!blog) {
    c.status(404);
    return c.json({
      error: true,
      message: "The blog you are looking for does not exists!!",
    });
  }

  return c.json(blogsDTOConverter(blog));
});
