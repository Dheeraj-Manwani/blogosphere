import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
  title: string;
  content: string;
  id: string;
  authorName: string;
  profileImage?: string;
  authorDescription?: string;
  publishedOn: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
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
      .catch((err: any) => {
        setError(err.response.data.message);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  return { loading, blog, error };
};

export const useBlogs = (filter?: boolean) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const url = filter
      ? `${BACKEND_URL}/api/v1/blogs/user-blogs`
      : `${BACKEND_URL}/api/v1/blogs/bulk`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  }, []);

  return { loading, blogs, error };
};
