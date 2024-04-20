import axios from "axios";
import { BACKEND_URL } from "../config";

export const createNewBlog = async (title: string, content: string) => {
  try {
    await axios.post(
      `${BACKEND_URL}/api/v1/blogs`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateBlog = async (
  id: string,
  title: string,
  content: string
) => {
  try {
    await axios.put(
      `${BACKEND_URL}/api/v1/blogs/${id}`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
