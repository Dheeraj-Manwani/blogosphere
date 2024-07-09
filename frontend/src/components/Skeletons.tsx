import { Button, LabelledInput } from "./Auth";
import { Circle } from "./BlogCard";
import { v4 as uuidv4 } from "uuid";
import { TextArea } from "./NewEditor";

export const Skeletons = ({
  type,
}: {
  type: "card" | "full-blog" | "profile" | "";
}) => {
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

  if (type === "profile") {
    return <ProfileSkeleton />;
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
    <div className="mb-40">
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

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col container max-w-[1280px] bg-slate-200 rounded-md pb-16 mt-6 m-auto">
      <div className="text-2xl font-semibold text-center m-3">Your Details</div>
      <div className="w-11/12 m-auto flex flex-col-reverse md:flex-row bg-white lg:p-4 md:p-2">
        <div className="flex flex-col lg:w-4/6 md:w-7/12">
          <form>
            <LabelledInput
              label="Name"
              placeholder=""
              onChange={() => {}}
              value={""}
              type="text"
              style="lg:w-4/5 md:w-11/12 w-4/5 m-auto animate-pulse"
              disabled
              key={uuidv4()}
            />
            <LabelledInput
              label="Email"
              placeholder=""
              onChange={() => {}}
              value={""}
              type="text"
              style="lg:w-4/5 md:w-11/12 w-4/5 m-auto animate-pulse"
              disabled
              key={uuidv4()}
            />
            <div className="lg:w-4/5 md:w-11/12 w-4/5 m-auto">
              <TextArea
                id="title"
                setValue={() => {}}
                value={""}
                rows={5}
                placeholder=""
                label="Description"
                style="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full animate-pulse"
              />
            </div>
            <div className="lg:w-4/5 md:w-11/12 w-4/5 m-auto">
              <Button
                name="Submit"
                onClick={async () => {}}
                style="w-full mb-3 aanimate-pulse"
              />
            </div>
          </form>
        </div>
        <div className="lg:w-2/6 md:w-5/12 lg:h-96 md:h-64 md:pl-2.5 flex flex-col align-middle m-auto md:m-0">
          <div className="w-64 h-64 mt-14">
            <div>
              <div className="absolute rounded-[50%] cursor-pointer w-64 h-64 flex flex-col justify-center items-center bg-gray-100 animate-pulse">
                <label className="absolute rounded-[50%] cursor-pointer w-64 h-64 flex flex-col justify-center items-center bg-gray-100 border-2">
                  <div className="p-2 text-center"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
