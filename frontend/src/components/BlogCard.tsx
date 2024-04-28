import profile from "./../assets/profile.png";
import { Button } from "./Button";
import { formatDate } from "../util/util";

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
  type = "",
}: BlogCardProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 my-4 w-11/12 max-w-screen-md m-auto">
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
          {formatDate(publishedDate)}
        </div>
      </div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-md overflow-clip">
        {content.length > 200
          ? htmlToText(content).slice(0, 200) + "..."
          : htmlToText(content)}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-500 font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>

        {type !== "editable" && (
          <Button icon="arrow" href={`/blogs/${id}`} text="Read more" />
        )}
        {type === "editable" && (
          <Button icon="edit" href={`/blogs/edit/${id}`} text="Edit" />
        )}
      </div>
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
        <img src={profile} alt="login" className="bg-white cursor-pointer" />
      )}
      {!name && type !== "link" && (
        <img src={profile} alt="login" className="bg-white" />
      )}
    </div>
  );
}
