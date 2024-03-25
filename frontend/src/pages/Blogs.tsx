import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { v4 as uuidv4 } from "uuid";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-screen max-w-full">
        <div className="w-full max-w-15/16 m-auto">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Unknown"}
              title={blog.title}
              content={blog.content}
              publishedDate="10th March 2024"
              key={uuidv4()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
