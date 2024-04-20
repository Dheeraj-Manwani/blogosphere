import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
  title: string;
  content: string;
  id: string;
  authorName: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blog, setBlog] = useState<Blog>();

  if (!id) {
    return { loading: false, blog: { content: "", title: "" }, error: false };
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  return { loading, blog, error };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blogs/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
