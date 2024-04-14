import { Link } from "react-router-dom";
import profile from "./../assets/profile.png";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  type?: string;
}
export function htmlToText(html: string): string {
  let temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || "";
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  type,
}: BlogCardProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 my-4 w-11/12 max-w-screen-md m-auto">
      {/* <Link to={`/blogs/${id}`}> */}
      <div className="flex mb-1">
        <div>
          <Avatar
            name={authorName}
            className={`${
              authorName ? "w-6 h-6" : "w-5 h-5 translate-y-1"
            } text-xs`}
          />
        </div>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
          {authorName || "Unknown"}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-md overflow-clip">
        {htmlToText(content).slice(0, 200) + "..."}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>

        <Link
          to={`/blogs/${id}`}
          className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-gray-800 hover:bg-gray-900 rounded-lg focus:ring-4 focus:outline-none "
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
      {/* </Link> */}
    </div>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  className = "",
  type,
}: {
  name: string;
  className?: string;
  type?: string;
}) {
  console.log("Avatar ::::: ", name);
  return (
    <div
      className={
        `relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ` +
        className
      }
    >
      {name && (
        <span className=" text-gray-100 ">
          {name
            .split(" ")
            .map((n) => n[0].toUpperCase())
            .join("")}
        </span>
      )}
      {!name && type === "link" && (
        <Link to={"/signin"}>
          <img src={profile} alt="login" className="bg-white cursor-pointer" />
        </Link>
      )}
      {!name && type !== "link" && (
        <img src={profile} alt="login" className="bg-white" />
      )}
    </div>
  );
}
