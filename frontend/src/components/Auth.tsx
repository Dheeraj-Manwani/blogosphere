import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Spinner from "./Spinner";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedUser, modal } from "../recoil/atom/atom";
import { MESSAGES } from "../data/data";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [_, setLoggedUser] = useRecoilState(loggedUser);
  const setModalState = useSetRecoilState(modal);

  const navigate = useNavigate();

  const sendRequest = async () => {
    if (
      (!postInputs.email || !postInputs.name || !postInputs.password) &&
      type === "signup"
    ) {
      setModalState({
        visible: true,
        message: MESSAGES.allFieldsRequired,
        href: "",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const token = response.data.token;
      setLoggedUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        profileImage: response.data.profileImage,
      });
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (err: any) {
      console.log(err);
      setModalState({
        visible: true,
        message: err.response.data.message,
        href: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="h-[88.5vh] flex justify-center flex-col">
      <div className="flex justify-center -translate-y-10">
        <div>
          <div className="px-10">
            {type === "signin" && (
              <div className="text-3xl font-extrabold">
                Log into your account
              </div>
            )}
            {type === "signup" && (
              <div className="text-3xl font-extrabold">Create an account</div>
            )}
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
                value={postInputs.name}
                disabled={loading}
              />
            )}
            <LabelledInput
              label="Email"
              placeholder="enter email"
              type="email"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, email: e.target.value }))
              }
              value={postInputs.email}
              disabled={loading}
            />

            <LabelledInput
              label="Password"
              placeholder="enter password"
              type="password"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, password: e.target.value }))
              }
              value={postInputs.password}
              disabled={loading}
            />
            <Button
              onClick={sendRequest}
              name={type === "signin" ? "Sign in" : "Sign up"}
            />
          </div>
          <Spinner loading={loading} type="Auth" />
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  disabled?: boolean;
  style?: string;
}

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  value,
  type,
  disabled,
  style,
}: LabelledInputType) => {
  return (
    <div>
      <div className={`${style ? style : "w-full"}`}>
        <label className="block mb-0.5 text-md  tracking-wider text-black pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          id={label}
          onChange={onChange}
          className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full ${
            disabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
          } `}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
};

interface ButtonPropsType {
  onClick: any;
  name: string;
  style?: string;
}

export const Button = ({ onClick, name, style }: ButtonPropsType) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-5 ${
        style ? style : "w-full"
      }`}
    >
      {name}
    </button>
  );
};
