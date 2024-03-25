import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
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
}: BlogCardProps) => {
  return (
    <Link to={`/blogs/${id}`}>
      <div className="border-b border-slate-400 p-4 w-11/12 max-w-screen-md cursor-pointer m-auto">
        <div className="flex ">
          <div className="">
            <Avatar name={authorName} className="w-6 h-6 text-xs" />
          </div>
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-md font-thin">
          {htmlToText(content).slice(0, 100) + "..."}
        </div>
        <div className="text-sm text-slate-500 font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={
        `relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ` +
        className
      }
    >
      <span className=" text-gray-100 ">
        {name
          .split(" ")
          .map((n) => n[0].toUpperCase())
          .join("")}
      </span>
    </div>
  );
}
