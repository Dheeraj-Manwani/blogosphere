import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar, htmlToText } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center"></div>
      <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
        <div className="col-span-8">
          <div className="text-5xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 pt-2">Posted on 2nd December 2023</div>
          <div className="pt-4">{htmlToText(blog.content)}</div>
        </div>
        <div className="col-span-4">
          <div className="text-slate-600 text-lg"> Author</div>
          <div className="flex">
            <div className="pr-4 flex flex-col justify-center">
              <Avatar name={blog.authorName} className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xl font-bold">
                {blog.authorName || "Unknown"}
              </div>
              <div className="pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab the
                user's attention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};