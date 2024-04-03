import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedUser } from "../recoil/atom/loggedUser";

export const Appbar = () => {
  const currHref = window.location.href;
  const navigate = useNavigate();

  const loggedInUserName = useRecoilValue(loggedUser);
  const [_, setLoggedUser] = useRecoilState(loggedUser);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedUser("");
    navigate("/signin");
  };
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
            className=" text-gray-500 hover:text-gray-800 transition-all duration-300 font-semibold text-lg pr-4 py-2 my-0.5 focus:outline-none outline-none"
          >
            View Blogs
          </Link>
        )}
        {!currHref.endsWith("/blogs/new") && (
          <Link
            to={"/blogs/new"}
            className="text-gray-500 hover:text-gray-800 transition-all duration-300 font-semibold text-lg pr-4 py-2 my-0.5 focus:outline-none outline-none"
          >
            Create New
          </Link>
        )}
        {(currHref.endsWith("/blogs") || currHref.endsWith("/new")) && (
          <Link
            to={"#"}
            className="text-gray-500 hover:text-gray-800 transition-all duration-300 font-semibold text-lg pr-4 py-2 my-0.5 focus:outline-none outline-none"
            onClick={handleLogout}
          >
            Logout
          </Link>
        )}

        <div>
          <Avatar name={loggedInUserName} className="w-10 h-10 text-lg mt-1" />
        </div>
      </div>
    </div>
  );
};
