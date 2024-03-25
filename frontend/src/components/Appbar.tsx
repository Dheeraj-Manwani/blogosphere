import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const currHref = window.location.href;
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/"}
        className="text-2xl flex flex-col justify-center cursor-pointer logo-font tracking-widest font-bold"
      >
        BlogoSphere
      </Link>
      <div className="flex justify-center">
        {!currHref.endsWith("blogs") && (
          <Link
            to={"/blogs"}
            className=" text-gray-500 hover:text-gray-800 transition-all duration-300 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg py-2 my-0.5 focus:outline-none"
          >
            View Blogs
          </Link>
        )}
        {!currHref.endsWith("/blogs/new") && (
          <Link
            to={"/blogs/new"}
            className="text-gray-500 hover:text-gray-800 transition-all duration-300 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-4 py-2 my-0.5 focus:outline-none"
          >
            Create New
          </Link>
        )}

        <div>
          <Avatar name={"Dheeraj Manwani"} className="w-10 h-10 text-lg mt-1" />
        </div>
      </div>
    </div>
  );
};
