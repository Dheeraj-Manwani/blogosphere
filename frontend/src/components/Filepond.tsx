// Import React FilePond
// import { FilePond, registerPlugin } from "react-filepond";

// // Import FilePond styles
// import "filepond/dist/filepond.min.css";

// // Import the Image EXIF Orientation and Image Preview plugins
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { storage } from "./NewEditor";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { loggedUser } from "../recoil/atom/atom";
import { useState } from "react";
import profile from "./../assets/profile.png";
import { Icon } from "./Icon";

// import { FilePondInitialFile } from "filepond";

// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
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
      setSpinnerVisible(true);
      console.log("inside handle file change", e.target.files[0]);
      const file = e.target.files[0];
      const splittedFile = file.name.split(".");
      const extension = splittedFile[splittedFile.length - 1];

      const fileNameWithoutSpecialChars = file?.name.replace(
        /[^a-zA-Z0-9]/g,
        ""
      );
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
        {/* <div style={{ color: "#999" }}> </div> */}
      </div>
      {/* <FilePond
        oninit={() => {
          const filepond = document.querySelector(".filepond--drop-label");
          filepond?.classList.add("bg-gray-50");
          filepond?.classList.add("text-black");
          filepond?.classList.add("text-md");
          filepond?.classList.add("tracking-wider");
          filepond?.classList.add("cursor-pointer");
          const filepondRoot = document.querySelector(".filepond--root");
          filepondRoot?.classList.add("border");
          filepondRoot?.classList.add("border-gray-300");
        }}
        // files={file}
        allowMultiple={false}
        maxFiles={1}
        // files={[
        //   "https://firebasestorage.googleapis.com/v0/b/blogosphere-app.appspot.com/o/Dheeraj%20Manwani%2Fprofile-photo%2Fmic.png?alt=media&token=892b1de4-5c50-49cb-9a99-e0c9e4c6bda5",
        // ]}
        server={{
          process: async (fieldName, file, metadata, load, error) => {
            const splittedFile = file.name.split(".");
            const extension = splittedFile[splittedFile.length - 1];

            const fileNameWithoutSpecialChars = file?.name.replace(
              /[^a-zA-Z0-9]/g,
              ""
            );
            const fileName = fileNameWithoutSpecialChars.slice(
              0,
              -extension.length
            );
            const storageRef = ref(
              storage,
              `${
                loggedInUser.name ? loggedInUser.name : "Unknown"
              }/profile-photo/${fileName + "." + extension}`
            );

            await uploadBytes(storageRef, file);

            const url = await getDownloadURL(storageRef);
            console.log(url);
            load("done ");
            // error("nsvfisnvk");
            return {
              abort: () => {},
            };
          },
          revert: async () => {
            console.log("revert ran ddd");
          },
        }}
        name="files"
        labelIdle='Drag & Drop profile pic or <span class="filepond--label-action">Browse</span>'
        imagePreviewHeight={10}
        onremovefile={() => {
          console.log("remove file called");
        }}
        stylePanelLayout="compact circle"
        styleLoadIndicatorPosition="center bottom"
        styleButtonRemoveItemPosition="center bottom"
        acceptedFileTypes={["image/png"]}
      /> */}
    </div>
  );
}
