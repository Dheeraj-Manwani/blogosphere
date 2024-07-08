import { useEffect } from "react";
import { BlogCard } from "../components/BlogCard";
import { v4 as uuidv4 } from "uuid";
import { useBlogs } from "../hooks/useBlogs";
import { modal } from "../recoil/atom/atom";
import { useSetRecoilState } from "recoil";
import { Skeletons } from "../components/Skeletons";
import { MESSAGES } from "../data/data";

export const UserBlogs = () => {
  const setModalState = useSetRecoilState(modal);

  const { blogs, loading, error } = useBlogs(true);

  useEffect(() => {
    if (error) {
      setModalState({
        visible: true,
        message: MESSAGES.signInToSeeBlogs,
        href: "/signin",
      });
    }
  }, [error]);

  if (loading) {
    return <Skeletons type="card" />;
  }
  return (
    <div>
      <div className="flex justify-center w-screen max-w-full">
        <div className="w-full max-w-15/16 m-auto">
          {blogs?.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.authorName}
              authorImage={blog.profileImage}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedOn}
              key={uuidv4()}
              type="editable"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
