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

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDERS_ID,
  appId: process.env.ADD_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, `gs://${process.env.STORAGE_BUCKET}`);

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
  // const loggedInUserName = loggedInUser ? loggedInUser :
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
  const adjustHeight = () => {
    const textarea: any = document.getElementById("title");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  return (
    <div className="w-full flex flex-col mb-6">
      <form className="mx-auto px-4 w-full max-w-5xl ">
        <div className="w-full text-3xl lg:text-4xl font-semibold">
          <textarea
            id="title"
            className="w-full mt-9 focus:outline-none"
            value={editorTitle}
            placeholder="Blog title"
            onChange={(e) => {
              // setEditorContent({ ...editorContent, title: e.target.value });
              setEditorTitle(e.target.value);
              adjustHeight();
            }}
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

    //   <CKEditor
    //     config={{
    //       // @ts-ignore
    //       extraPlugins: [uploadPlugin],
    //     }}
    //     editor={ClassicEditor}
    //     onReady={(editor) => {}}
    //     onBlur={(event, editor) => {}}
    //     onFocus={(event, editor) => {}}
    //     onChange={(event, editor) => {
    //       setEditor(editor.getData());
    //     }}
    //     data={editor}
    //   />
  );
};
