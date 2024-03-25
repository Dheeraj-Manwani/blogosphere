import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar"; // Make sure to import your Appbar component

export const Start = () => {
  return (
    <div className="flex flex-col h-screen">
      <Appbar />

      <div className="flex-grow flex justify-center">
        <div className="text-center">
          <div className="flex justify-center mt-40">
            <div className="flex flex-col justify-center m-auto">
              <h1 className="logo-font text-6xl pt-12 pb-1 font-semibold tracking-wider">
                BlogoSphere
              </h1>
              <h3 className="text-lg font-semibold mb-6 text-gray-500 logo-font tracking m-auto">
                Where Every Thought Finds its Orbit
              </h3>
            </div>
            <div>
              <video autoPlay muted loop id="myVideo" className="h-52">
                <source src="src/assets/Globe.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* <div className="flex justify-center gap-8 mt-10">
            <Link
              to="/blogs"
              className="text-gray-500 hover:text-gray-800 font-semibold px-6 py-3  flex items-center justify-center"
            >
              View Blogs
            </Link>
            <Link
              to="/blogs/new"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-md shadow-md flex items-center justify-center"
            >
              Write a Blog
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};
