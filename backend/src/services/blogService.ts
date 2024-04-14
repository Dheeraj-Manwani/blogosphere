import { Blog } from "./../../../frontend/src/hooks/index";

export interface blogsDTO {
  id: string;
  content: string;
  title: string;
  authorName: string;
}

export const createBlog = async (c: any, prisma: any, id: any, body: any) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        posts: {
          create: [{ title: body.title, content: body.content }],
        },
      },
    });
    return c.json({ id, message: "blog created successfully" });
  } catch (err) {
    console.log(err);
    return c.text("some error occured in post blog route");
  }
};

export const createAnonymousBlog = async (
  c: any,
  prisma: any,
  id: any,
  body: any
) => {
  try {
    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id, message: "blog created successfully" });
  } catch (err) {
    console.log(err);
    return c.text("some error occured in post blog route");
  }
};

export const getAllBlogs = async (prisma: any, c: any) => {
  const blogs: Blog[] = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
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
};

export const blogsDTOConverter = (blog: Blog) => {
  const { author, ...blogObj } = blog;
  blogObj.authorName = blog.author?.name;
  // console.log(blogObj);
  return blogObj;
};
