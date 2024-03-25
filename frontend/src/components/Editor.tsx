import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Appbar } from "./Appbar";
// import { type } from "./../../../common/dist/index.d";

interface MyEditorProps {
  setEditorContent: any;
  editorContent: any;
  onSubmit: any;
}

export class MyEditor extends Component<MyEditorProps> {
  render() {
    const { setEditorContent, editorContent, onSubmit } = this.props;

    const adjustHeight = () => {
      const textarea: any = document.getElementById("title");
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    return (
      <div className="w-full h-screen flex flex-col">
        <Appbar />
        <form className="mx-auto px-4 w-full max-w-5xl ">
          <div className="w-full text-4xl font-semibold">
            <textarea
              id="title"
              className="w-full mt-9 focus:outline-none"
              value={editorContent.title}
              placeholder="Blog title"
              onChange={(e) => {
                setEditorContent({ ...editorContent, title: e.target.value });
                adjustHeight();
              }}
            />
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data=""
              // onReady={}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorContent({ ...editorContent, content: data });
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
  }
}
