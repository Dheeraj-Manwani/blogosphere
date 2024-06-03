import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";
import {
  UploadAdapter,
  FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "./../config";

interface MyEditorProps {
  setEditorContent: any;
  editorContent: any;
  setEditorTitle: any;
  editorTitle: any;
  onSubmit: any;
}

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await axios.request({
            method: "POST",
            url: `${BACKEND_URL}/upload_files`,
            data: {
              files: file,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          resolve({
            default: `${BACKEND_URL}/${response.data.filename}`,
          });
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

export const NewEditor = ({
  setEditorContent,
  editorContent,
  setEditorTitle,
  editorTitle,
  onSubmit,
}: MyEditorProps) => {
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
