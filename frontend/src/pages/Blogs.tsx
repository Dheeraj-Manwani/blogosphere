import { BlogCard } from "../components/BlogCard";
import { Skeletons } from "../components/Skeletons";
import { useBlogs } from "../hooks/useBlogs";
import { v4 as uuidv4 } from "uuid";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <Skeletons type="card" />;
  }
  return (
    <div>
      <div className="flex justify-center w-screen max-w-full">
        <div className="w-full max-w-15/16 m-auto">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.authorName}
              authorImage={blog.profileImage}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedOn}
              key={uuidv4()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
