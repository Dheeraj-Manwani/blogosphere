import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@dheeraj1320/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="enter name"
                type="text"
                onChange={(e) =>
                  setPostInputs((c) => ({ ...c, name: e.target.value }))
                }
              />
            )}
            <LabelledInput
              label="Username"
              placeholder="enter username"
              type="text"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, username: e.target.value }))
              }
            />
            <LabelledInput
              label="Password"
              placeholder="enter password"
              type="password"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, password: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={sendRequest}
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-extrabold text-black pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          id="first_name"
          onChange={onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};
