import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyEditor } from "../components/Editor";
import { useBlog } from "../hooks";
import Spinner from "../components/Spinner";
import { createNewBlog, updateBlog } from "../api/Blog";
import { useSetRecoilState } from "recoil";
import { modal } from "../recoil/atom/atom";
import { MESSAGES } from "./../data/data.js";

export const NewBlog = () => {
  const [editorContent, setEditorContent] = useState({
    title: "",
    content: "",
  });
  const setModalState = useSetRecoilState(modal);
  const { id } = useParams();
  const { loading, blog, error } = useBlog({ id: id || "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("inside submit handler");

    if (!editorContent.content || !editorContent.title) {
      setModalState({ visible: true, message: MESSAGES.editorEmpty, href: "" });
      return;
    }
    if (!id) {
      await createNewBlog(editorContent.title, editorContent.content);
      navigate("/blogs");
    } else {
      const res = await updateBlog(
        id,
        editorContent.title,
        editorContent.content
      );
      if (res.error) {
        setModalState({
          visible: true,
          message: MESSAGES.notYourBlog,
          href: "/blogs",
        });
      }
    }
  };

  useEffect(() => {
    if (error) {
      setModalState({ visible: true, message: error, href: "/blogs/new" });
    }
    if (blog && blog.title && blog.content) {
      setEditorContent({
        title: blog?.title || "",
        content: blog?.content || "",
      });

      console.log("insode adcdjsb ", blog);
    }
  }, [blog, error]);

  return (
    <>
      <MyEditor
        setEditorContent={setEditorContent}
        editorContent={editorContent}
        onSubmit={handleSubmit}
      />
      <Spinner loading={loading} type="Editor" />
    </>
  );
};
