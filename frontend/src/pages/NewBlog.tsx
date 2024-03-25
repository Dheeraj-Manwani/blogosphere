import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MyEditor } from "../components/Editor";
import { CreateBlogInput } from "@dheeraj1320/medium-common";
import { BACKEND_URL } from "../config";
import { Modal } from "../components/Modal";

export const NewBlog = () => {
  const [editorContent, setEditorContent] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("inside submit handler");

    if (!editorContent.content || !editorContent.title) {
      setIsModalVisible(true);
      return;
      // alert("title or content should not be empty");
    }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blogs`,
        {
          title: editorContent.title,
          content: editorContent.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(editorContent);
  return (
    <>
      <MyEditor
        setEditorContent={setEditorContent}
        editorContent={editorContent}
        onSubmit={handleSubmit}
      />
      <Modal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        content={"Blog title or description cannot be empty!!"}
      />
    </>
  );
};
