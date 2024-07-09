import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";
import {
  UploadAdapter,
  FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useRecoilValue } from "recoil";
import { loggedUser } from "../recoil/atom/atom";

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDERS_ID,
  appId: process.env.ADD_ID,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, `gs://${process.env.STORAGE_BUCKET}`);

interface MyEditorProps {
  setEditorContent: any;
  editorContent: any;
  setEditorTitle: any;
  editorTitle: any;
  onSubmit: any;
}

export const NewEditor = ({
  setEditorContent,
  editorContent,
  setEditorTitle,
  editorTitle,
  onSubmit,
}: MyEditorProps) => {
  const loggedInUser = useRecoilValue(loggedUser);
  function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file;
            if (file) {
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
                `${loggedInUser.name ? loggedInUser.name : "Unknown"}/${
                  fileName + "." + extension
                }`
              );

              await uploadBytes(storageRef, file);

              const url = await getDownloadURL(storageRef);
              resolve({
                default: url,
              });
            }
          } catch (error) {
            reject(error);
          }
        });
      },
      abort: () => {},
    };
  }
  function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  // const adjustHeight = () => {
  //   const textarea: any = document.getElementById("title");
  //   textarea.style.height = "auto";
  //   textarea.style.height = textarea.scrollHeight + "px";
  // };
  return (
    <div className="w-full flex flex-col mb-6">
      <form className="mx-auto px-4 w-full max-w-5xl ">
        <div className="w-full text-3xl lg:text-4xl font-semibold">
          <TextArea
            id="title"
            setValue={setEditorTitle}
            value={editorTitle}
            placeholder="Blog title"
            style="mt-9 w-full"
          />
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            // onReady={}
            config={{
              extraPlugins: [uploadPlugin],
            }}
            onChange={(_, editor) => {
              const data = editor.getData();
              // setEditorContent({ ...editorContent, content: data });
              setEditorContent(data);
            }}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <button
            type="button"
            onClick={onSubmit}
            className=" py-2.5 w-72 mt-5 mx-auto  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

interface TextAreaProps {
  id: string;
  value: string;
  setValue: (arg0: string) => void;
  style?: string;
  rows?: number;
  placeholder?: string;
  label?: string;
}

export const TextArea = ({
  id,
  value,
  setValue,
  style,
  rows,
  placeholder,
  label,
}: TextAreaProps) => {
  const adjustHeight = (id: string) => {
    const textarea: any = document.getElementById(id);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  return (
    <>
      {label && (
        <label className="block mb-0.5 text-md tracking-wider text-black pt-4">
          {label}
        </label>
      )}

      <textarea
        id="title"
        className={`focus:outline-none rounded-md p-2 ${
          style ? style : "w-full"
        }`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          // setEditorContent({ ...editorContent, title: e.target.value });
          setValue(e.target.value);
          adjustHeight(id);
        }}
        rows={rows}
      />
    </>
  );
};
