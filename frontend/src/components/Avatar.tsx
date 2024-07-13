import { useRecoilValue } from "recoil";
import profile from "./../assets/profile.png";
import { loggedUser } from "../recoil/atom/atom";

export function Avatar({
  name,
  className = "",
  type,
  profileImage,
}: {
  name?: string;
  className?: string;
  type?: string;
  profileImage?: string;
}) {
  const loggedInUser = useRecoilValue(loggedUser);
  console.log("iinside avatar ", name, profileImage);
  console.log("iinside avatar state is", loggedInUser);
  return (
    <div
      className={
        `relative inline-flex items-center justify-center overflow-hidden rounded-full ${
          !profileImage ? "bg-gray-600 " : " "
        } ` + className
      }
    >
      {name && !profileImage && (
        <span className=" text-gray-100 ">
          {name
            .trim()
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0].toUpperCase())
            .join("")}
        </span>
      )}
      {name && profileImage && (
        <span className=" text-gray-100 ">
          <img src={profileImage} />
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
