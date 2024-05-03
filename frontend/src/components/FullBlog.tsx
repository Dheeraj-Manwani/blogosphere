import { Blog } from "../hooks";
import { formatDate } from "../util/util";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div className="flex flex-col gap-7 lg:flex-row px-10 w-full pt-200 max-w-screen-xl py-12">
        <div className="w-full lg:w-8/12">
          <div className="text-4xl lg:text-5xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-500 pt-2">
            Posted on {formatDate(blog.publishedOn)}
          </div>
          <div
            className="pt-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="text-slate-600 text-lg"> Author</div>
          <div className="flex ">
            <div className="pr-4 flex flex-col pt-4 pl-2">
              <Avatar name={blog.authorName} className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xl font-bold">
                {blog.authorName || "Unknown"}
              </div>
              <div className="pt-2 text-slate-500">
                {blog.authorName || "The author of this blog "} is a visionary
                thinker, consistently pushing boundaries and offering fresh
                insights that inspire and provoke thought.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
