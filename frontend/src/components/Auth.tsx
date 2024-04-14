import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../config";
import { SignupType } from "@dheeraj1320/medium-common";
import axios from "axios";
import Spinner from "./Spinner";
import { useRecoilState } from "recoil";
import { loggedUser } from "../recoil/atom/loggedUser";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });
  const [_, setLoggedUser] = useRecoilState(loggedUser);

  const navigate = useNavigate();

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/${type === "signin" ? "signin" : "signup"}`,
        postInputs
      );
      const token = response.data.token;
      console.log("inside auth:::", response.data.name);
      setLoggedUser(response.data.name);
      // console.log("logged in user name form")
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
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
              disabled={loading}
            />
            {/* {loading && (
              <div role="status" className="absolute top-2/4 left-80">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )} */}

            <LabelledInput
              label="Password"
              placeholder="enter password"
              type="password"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, password: e.target.value }))
              }
              disabled={loading}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-5"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
          <Spinner loading={loading} />
          {/* <Modal /> */}
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
  disabled?: boolean;
}

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
  disabled,
}: LabelledInputType) => {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-extrabold text-black pt-4">
          {label}
        </label>
        <input
          type={type || "text"}
          id={label}
          onChange={onChange}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            disabled ? "bg-gray-300" : ""
          }`}
          placeholder={placeholder}
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
};
