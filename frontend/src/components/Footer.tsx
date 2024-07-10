import logo from "./../../src/assets/favicon.ico";
import { BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className="sm:mt-14 bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a
              href="https://blogosphere-project.vercel.app/"
              className="flex items-center"
            >
              <img src={logo} className="h-8 me-3" alt="Blogosphere Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Blogosphere
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Quick Link
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://blogosphere-project.vercel.app"
                    className="hover:underline"
                    target="blank"
                  >
                    Home
                  </a>
                </li>
                {/* <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Write a blog
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Follow Me
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/Dheeraj-Manwani"
                    className="flex hover:underline "
                    target="blank"
                  >
                    <span className="mt-1.5 mr-1">
                      <BsGithub size={15} />
                    </span>
                    Github
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://x.com/dkManwani2000"
                    className="flex hover:underline"
                  >
                    <span className="mt-1.5 mr-1">
                      <BsTwitterX size={15} />
                    </span>
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/_dheeraj_manwani_"
                    className="flex hover:underline"
                    target="blank"
                  >
                    <span className="mt-1.5 mr-1">
                      <BsInstagram size={15} />
                    </span>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Blogosphere™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
