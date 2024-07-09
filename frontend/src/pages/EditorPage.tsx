import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs.js";
import Spinner from "../components/Spinner";
import { createNewBlog, updateBlog } from "../api/Blog";
import { useSetRecoilState } from "recoil";
import { modal } from "../recoil/atom/atom";
import { MESSAGES } from "./../data/data.js";
import { NewEditor } from "../components/NewEditor.js";

export const NewBlog = () => {
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const setModalState = useSetRecoilState(modal);
  const { id } = useParams();
  const { loading, blog, error } = useBlog({ id: id || "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!editorContent || !editorTitle) {
      setModalState({ visible: true, message: MESSAGES.editorEmpty, href: "" });
      return;
    }
    if (!id) {
      setIsSubmitting(true);
      await createNewBlog(editorTitle, editorContent);
      setIsSubmitting(false);
      navigate("/blogs");
    } else {
      setIsSubmitting(true);
      const res = await updateBlog(id, editorTitle, editorContent);
      setIsSubmitting(false);
      if (res.error) {
        setModalState({
          visible: true,
          message: MESSAGES.notYourBlog,
          href: "/blogs",
        });
      }
      navigate("/user-blogs");
    }
  };

  console.log("Editor page rerender");

  useEffect(() => {
    if (error) {
      setModalState({
        visible: true,
        message: error === true ? "" : error,
        href: "/blogs/new",
      });
    }
    if (blog && blog.title && blog.content) {
      setEditorContent(blog.content);
      setEditorTitle(blog.title);
    }
  }, [loading]);

  return (
    <>
      <NewEditor
        setEditorContent={setEditorContent}
        editorContent={editorContent}
        setEditorTitle={setEditorTitle}
        editorTitle={editorTitle}
        onSubmit={handleSubmit}
      />
      <Spinner loading={loading || isSubmitting} type="Editor" />
    </>
  );
};
