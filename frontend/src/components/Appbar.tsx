import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilState } from "recoil";
import { loggedUser } from "../recoil/atom/atom";
import { useState } from "react";

export const Appbar = () => {
  const [menuExpand, setMenuExpand] = useState<boolean>(false);
  const [profileExpand, setProfileExpand] = useState<boolean>(false);
  const navigate = useNavigate();

  const [loggedInUserName, setLoggedUser] = useRecoilState(loggedUser);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedUser({ id: "", name: "", email: "" });
    navigate("/signin");
  };

  return (
    <nav className="bg-white border-gray-200 shadow-md absolute w-full z-20">
      <div className=" flex flex-wrap items-center justify-between mx-1 sm:mx-6 p-5 ">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse w-40"
        >
          <span className="self-center text-2xl font-semibold logo-font whitespace-nowrap tracking-normal sm:tracking-widest">
            BlogoSphere
          </span>
        </Link>

        {/* SideBar */}
        <div className="flex flex-row-reverse items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse lg:w-40 md:w-30">
          <button
            className="flex text-sm  rounded-full md:me-0"
            onClick={() => {
              setProfileExpand(!profileExpand);
              setMenuExpand(false);
            }}
          >
            <Avatar
              name={loggedInUserName.name}
              className="w-10 h-10 text-lg mt-1"
              type="link"
            />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className={` absolute -translate-x-7 md:-translate-x-7 top-10  ${
              profileExpand ? "" : "hidden"
            } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-40 border border-gray-200`}
            id="user-dropdown"
          >
            {loggedInUserName?.name && loggedInUserName?.email && (
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 truncate">
                  {loggedInUserName.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate">
                  {loggedInUserName.email}
                </span>
              </div>
            )}
            <ul className="py-2" onClick={() => setProfileExpand(false)}>
              {localStorage.getItem("token") && (
                <li>
                  <Link
                    to="/user-blogs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    My Blogs
                  </Link>
                </li>
              )}
              {localStorage.getItem("token") && (
                <>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Log out
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/profile/${loggedInUserName.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      My Profile
                    </Link>
                  </li>
                </>
              )}
              {!localStorage.getItem("token") && (
                <li>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={() => {
              setMenuExpand(!menuExpand);
              setProfileExpand(false);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Appbar */}
        <div
          className={`items-center justify-between
           ${menuExpand ? "" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul
            className="flex flex-col font-medium m-auto p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:bg-white md:border-none"
            onClick={() => setMenuExpand(false)}
          >
            <li>
              <NavLink
                to="/"
                className=" text-gray-400 hover:text-gray-800 transition-all duration-300 font-semibold text-xl md:bg-transparent md:p-0"
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className=" text-gray-400 hover:text-gray-800 transition-all duration-300 font-semibold text-xl md:hover:bg-transparent md:p-0"
                end
              >
                Blogs
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/user-blogs"
                className=" text-gray-400 hover:text-gray-800 transition-all duration-300 font-semibold text-xl md:hover:bg-transparent md:p-0"
                end
              >
                My Blogs
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="blogs/new"
                className=" text-gray-400 hover:text-gray-800 transition-all duration-300 font-semibold text-xl md:hover:bg-transparent  md:p-0"
                end
              >
                Write
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
