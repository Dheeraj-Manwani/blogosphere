import { storage } from "./NewEditor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { loggedUser } from "../recoil/atom/atom";
import { useState } from "react";
import { Icon } from "./Icon";
import { checkValidImageExtension } from "../util/util";

export function FilePond({
  src,
  setSrc,
}: {
  src: string;
  setSrc: (src: string) => void;
}) {
  const loggedInUser = useRecoilValue(loggedUser);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("inside handle file change", e.target.files[0]);
      const file = e.target.files[0];
      const splittedFile = file.name.split(".");
      const extension = splittedFile[splittedFile.length - 1];
      if (!checkValidImageExtension(extension)) {
        return;
      }
      const fileNameWithoutSpecialChars = file?.name.replace(
        /[^a-zA-Z0-9]/g,
        ""
      );
      setSpinnerVisible(true);
      const fileName = fileNameWithoutSpecialChars.slice(0, -extension.length);
      const storageRef = ref(
        storage,
        `${loggedInUser.name ? loggedInUser.name : "Unknown"}/profile-photo/${
          fileName + "." + extension
        }`
      );

      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);
      console.log(url);
      setSpinnerVisible(false);
      setSrc(url);
    }
  };

  console.log("filepond re render");

  return (
    <div className="w-64 h-64 mt-14">
      <div>
        {!src && (
          <div className="absolute rounded-[50%] cursor-pointer w-64 h-64 flex flex-col justify-center items-center bg-gray-100">
            {!spinnerVisible && (
              <label
                htmlFor="profile-image-upload"
                className="absolute rounded-[50%] cursor-pointer w-64 h-64 flex flex-col justify-center items-center bg-gray-100 border-2"
              >
                <div className="p-2 text-center">
                  Click <span className="underline font-semibold">here</span> to
                  add a profile <br /> photo
                </div>
              </label>
            )}
            <input
              id="profile-image-upload"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
            {spinnerVisible && <Icon type="spiral" style="size-16" />}
          </div>
        )}
        {src && (
          <div>
            <button
              className="w-full flex flex-row-reverse"
              onClick={() => {
                setSrc("");
              }}
            >
              <Icon
                type="cross"
                style="size-6 absolute rounded-[50%] cursor-pointer"
              />
            </button>
            <img
              alt="Profile Pic"
              className="rounded-[50%] w-full aspect-square z-10 border border-black p-2"
              src={src}
              id="profile-image"
              height="200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
