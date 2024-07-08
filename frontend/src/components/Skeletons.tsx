import { Circle } from "./BlogCard";

export const Skeletons = ({ type }: { type: "card" | "full-blog" | "" }) => {
  if (type === "card") {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }

  if (type === "full-blog") {
    return <FullBlogSkeleton />;
  }

  return <div>Loading...</div>;
};

const CardSkeleton = () => {
  return (
    <div className="border rounded-lg shadow-lg p-4 my-4 w-11/12 max-w-screen-md m-auto animate-pulse">
      <div className="flex mb-1">
        <div>
          <svg
            className="w-5 h-5 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
        <div className="w-24 h-2.5 mt-1.5 ml-1 bg-gray-200 rounded-full"></div>

        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="w-24 h-2.5 mt-1.5 ml-1 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded-full my-1 mt-3 w-32"></div>
      <div className="w-full h-3 mt-3 bg-gray-200 rounded-full"></div>
      <div className="w-4/5 h-3 mt-2 bg-gray-200 rounded-full"></div>
      <div className="w-2/5 h-3 mt-2 bg-gray-200 rounded-full"></div>
      <div className="flex justify-between items-center">
        <div className="w-1/5 h-3 mt-4 bg-gray-200 rounded-full"></div>
        <div className="w-1/5 h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

const FullBlogSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-7 lg:flex-row px-10 w-full pt-200 max-w-screen-xl pt-12 animate-pulse">
        <div className="w-full lg:w-8/12">
          <div className="h-5 bg-gray-300 rounded-full w-full"></div>
          <div className="h-5 bg-gray-300 rounded-full mt-2 w-48"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-4 w-32"></div>

          <div className="h-3 bg-gray-200 rounded-full my-1 mt-10 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-4/6"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-6 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>

          <div className="h-3 bg-gray-200 rounded-full my-1 mt-6 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>

          <div className="h-3 bg-gray-200 rounded-full my-1 mt-8 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-4/6"></div>
        </div>
        <div className="w-1/2 lg:w-4/12">
          <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-20"></div>

          <div className="flex ">
            <div className="pr-4 flex flex-col pt-4 pl-2">
              <div>
                <svg
                  className="w-5 h-5 text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </div>
            </div>
            <div className="w-full">
              <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-24"></div>
              <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>
              <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-full"></div>
              <div className="h-3 bg-gray-200 rounded-full my-1 mt-3 w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
