import { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TextArea } from "./NewEditor";

interface MyEditorProps {
  setEditorContent: any;
  editorContent: any;
  setEditorTitle: any;
  editorTitle: any;
  onSubmit: any;
}

export class MyEditor extends Component<MyEditorProps> {
  render() {
    const {
      setEditorContent,
      editorContent,
      setEditorTitle,
      editorTitle,
      onSubmit,
    } = this.props;

    console.log("re - rendered editor");

    return (
      <div className="w-full flex flex-col mb-6">
        <form className="mx-auto px-4 w-full max-w-5xl ">
          <div className="w-full text-3xl lg:text-4xl font-semibold">
            {/* <textarea
              id="title"
              className="w-full mt-9 focus:outline-none"
              value={editorTitle}
              placeholder="Blog title"
              onChange={(e) => {
                // setEditorContent({ ...editorContent, title: e.target.value });
                setEditorTitle(e.target.value);
                adjustHeight("title");
              }}
            /> */}
            <TextArea
              id="title"
              setValue={setEditorTitle}
              value={editorTitle}
            />
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={editorContent}
              // onReady={}
              // config={editorConfiguration}
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
  }
}
