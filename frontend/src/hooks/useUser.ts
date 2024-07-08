import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  description?: string;
}

export const useUser = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User>({ id: "", name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.response.data.message);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  const updateUser = useCallback(
    async (
      id: string,
      name: string,
      email: string,
      description: string,
      profileImage: string
    ) => {
      setSubmitting(true);
      console.log("iside update user hook", user);
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user`,
        { id, name, email, description, profileImage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSubmitting(false);
      return res.data;
    },
    []
  );

  return { user, setUser, updateUser, loading, submitting, error };
  // return { user, error };
};
