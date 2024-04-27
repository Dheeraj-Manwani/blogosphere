import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { v4 as uuidv4 } from "uuid";
import { Blog } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { modal } from "../recoil/atom/atom";
import { Modal } from "../components/Modal";
import { useSetRecoilState } from "recoil";
import { MESSAGES } from "../data/data";

export const UserBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>();
  // const [isVisible, setIsVisible] = useState<boolean>(false);
  const setModalState = useSetRecoilState(modal);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blogs/user-blogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((e) => {
        console.log(e);
        setModalState({
          visible: true,
          message: e.response.data.error,
          href: "/signin",
        });
      });
  }, []);
  return (
    <div>
      <div className="flex justify-center w-screen max-w-full">
        <div className="w-full max-w-15/16 m-auto">
          {blogs?.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.authorName}
              title={blog.title}
              content={blog.content}
              publishedDate="10th March 2024"
              key={uuidv4()}
              type="editable"
            />
          ))}
        </div>
      </div>
      {/* <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        content="You need to log in before looking at your blogs!!"
        href="/signin"
      /> */}
    </div>
  );
};
